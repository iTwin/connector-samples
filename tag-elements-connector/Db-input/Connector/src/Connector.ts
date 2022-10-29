import * as elements from "./dmos/Elements";
import * as pcf from "@itwin/pcf";

import { LinkPartition, LinkModel, FunctionalModel, FunctionalPartition } from "@itwin/core-backend";
import { apiLoader } from "./utilities/sqldbLoader";

export class Connector extends pcf.PConnector {
  public async form() {
    let processFunctionalSchema = require.resolve('@bentley/process-functional-schema/ProcessFunctional.ecschema.xml');
    let schemaPaths = [];
    schemaPaths.push(processFunctionalSchema);

    new pcf.PConnectorConfig(this, {
      connectorName: "Connector",
      appId: "Tagging-Connector",
      appVersion: "2.0.0.0",

      // schemas to import
      domainSchemaPaths: schemaPaths,
    });
    // define subject name
    const subject1 = new pcf.SubjectNode(this, { key: "Subject-Tag" });

    const linkModel = new pcf.ModelNode(this, { key: "LinkModel1", subject: subject1, modelClass: LinkModel, partitionClass: LinkPartition });

    new pcf.LoaderNode(this, {
      key: "api-loader",
      model: linkModel,
      loader: new apiLoader({
        format: "json",
        entities: ["Vessel", "Heat_Exchanger", "Cooler", "Chiller", "Blower"],
        relationships: [],
        defaultPrimaryKey: "TAG_NO",
        primaryKeyMap: {}
      }),
    });
    
    //define models
    const funcModel = new pcf.ModelNode(this, { key: "TagFunctionalModel", subject: subject1, modelClass: FunctionalModel, partitionClass: FunctionalPartition });

    //define elements
    const vessel = new pcf.ElementNode(this, { key: "Vessel", model: funcModel, dmo: elements.Vessel });
    const heat_exchanger = new pcf.ElementNode(this, { key: "Heat_Exchanger", model: funcModel, dmo: elements.Heat_Exchanger });
    const cooler = new pcf.ElementNode(this, { key: "Cooler", model: funcModel, dmo: elements.Cooler });
    const chiller = new pcf.ElementNode(this, { key: "Chiller", model: funcModel, dmo: elements.Chiller });
    const blower = new pcf.ElementNode(this, { key: "Blower", model: funcModel, dmo: elements.Blower });
  }
}

export async function getConnectorInstance() {
  const connector = new Connector();
  await connector.form();
  return connector;
}