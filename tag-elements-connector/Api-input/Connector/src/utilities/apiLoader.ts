import { Logger } from "@bentley/bentleyjs-core";
import { APIConnection, IREntity, IRInstance, IRRelationship, Loader, LogCategory } from "@itwin/pcf";

export class apiLoader extends Loader {

    public json: any = {};
  
    protected async _open(con: APIConnection): Promise<void> {
        const axios = require('axios');
        const {data, status} = await axios.get(con.baseUrl);
        this.json = data;          
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
