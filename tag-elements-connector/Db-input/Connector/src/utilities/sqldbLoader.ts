import { Logger } from "@bentley/bentleyjs-core";
import { APIConnection, IREntity, IRInstance, IRRelationship, Loader, LogCategory } from "@itwin/pcf";

export class apiLoader extends Loader {

  public json: any = {};

  private getDataFromDB = async () => {
    const sql = require('mssql')
    const sqlConfig = {
      user: "<SQL login>",
      password: "<SQL password>",
      server: "<SQL database server>",
      database: "<Database name>",
      options: {
        encrypt: true,
        trustServerCertificate: false
      },
      // connectionString: "Server=#{server}\\sql;Database=#{database};Uid=#{user};Pwd=#{password};Encrypt=#{encrypt};TrustServerCertificate=#{trustServerCertificate}"
    };
    let result;
    try {
      Logger.logInfo(LogCategory.PCF, "Connecting to MSSQL database...");
      let pool = await sql.connect(sqlConfig);
      result = await pool.request()
        .query(`SELECT * FROM Vessel`);  // Vessel is my database table name
    } catch (err: any) {
      Logger.logError(LogCategory.PCF, err);
    }
    return result;
  };

  protected async _open(con: APIConnection): Promise<void> {
   let data = await this.getDataFromDB();
   this.json = {"Vessel": data["recordset"]};
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
