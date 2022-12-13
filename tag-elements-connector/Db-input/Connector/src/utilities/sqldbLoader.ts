import { Logger } from "@bentley/bentleyjs-core";
import { APIConnection, IREntity, IRInstance, IRRelationship, Loader, LogCategory } from "@itwin/pcf";

export class sqlLoader extends Loader {
  public json: any = {};
  public tables: any = [];
  public pool: any;
  
  private getDataFromDB = async (connectionString: string) => {
    const sql = require('mssql');
    let result = [];
    try {
      Logger.logInfo(LogCategory.PCF, "Connecting to MSSQL database...");
      this.pool = await sql.connect(connectionString);
      let res = (await this.pool.request()
        .query(`SELECT TABLE_NAME FROM information_schema.tables`))
      for (let index = 1; index < res.recordset.length; index++) {
        this.tables.push(res.recordset[index].TABLE_NAME);
      }
      for (let index = 0; index < this.tables.length; index++) {
        result.push(await this.pool.request()
          .query(`SELECT * FROM ${this.tables[index]}`));
      }
    } catch (err: any) {
      Logger.logError(LogCategory.PCF, err);
    }
    return result;
  };

  protected async _open(con: APIConnection): Promise<void> {
    let data = await this.getDataFromDB(con.baseUrl);
    for (let index = 0; index < data.length; index++) {
      this.json[this.tables[index]] = data[index]["recordset"]
    }
    console.log(this.json);
    this.pool.close();
  }

  protected async _close(): Promise<void> {
    this.json = {};
  }

  protected async _getEntities(): Promise<IREntity[]> {
    return this._getAll();
  }

  protected async _getRelationships(): Promise<IRRelationship[]> {
    return this._getAll();
  }

  protected async _getAll(): Promise<IREntity[]> {
    const keys = Object.keys(this.json);
    const entities: IREntity[] = [];
    for (const key of keys) {
      const entity = new IREntity({ key });
      entities.push(entity);
    }
    return entities;
  }

  protected async _getInstances(entityKey: string): Promise<IRInstance[]> {
    if (!(entityKey in this.json))
      throw new Error(`Source data does not have any entity named - ${entityKey}`);

    const objs = this.json[entityKey];
    const instances: IRInstance[] = [];
    const pkey = this.getPKey(entityKey);
    for (const obj of objs) {
      const instance = new IRInstance({
        pkey,
        entityKey,
        data: obj,
      });
      instances.push(instance);
    }
    return instances;
  }
}
