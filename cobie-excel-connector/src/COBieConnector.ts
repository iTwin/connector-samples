import * as bk from "@bentley/imodeljs-backend";
import * as pcf from "@itwin/pcf";
import * as elements from "./dmos/Elements";
import * as relationships from "./dmos/Relationships";
import * as relatedElements from "./dmos/RelatedElements";
import * as path from "path";

export class COBieConnector extends pcf.PConnector {
    constructor() {
        super();

        const config = new pcf.PConnectorConfig(this, {
            domainSchemaPaths: [
                "Functional.ecschema.xml",
                "SpatialComposition.ecschema.xml",
                "BuildingSpatial.ecschema.xml"
            ].map((file: string) => path.join(__dirname, "./assets/domain_schemas", file)),
            dynamicSchema: {
                schemaName: "COBieDynamic",
                schemaAlias: "cd",
            },
            connectorName: "COBieConnector",
            appId: "COBieConnector",
            appVersion: "1.0.0.0",
            loader: {
                // Select entity & relationship sheets to import.
                entityKeys: ["Contact", "Facility", "Floor", "Space", "Zone", "Type", "Component", "System", "Spare", "Resource", "Job", "Document", "Attribute"],
                relKeys: ["System", "Zone", "Space", "Connection", "Assembly"],
                primaryKeyMap: { Contact: "Email" },
                defaultPrimaryKey: "Name",
            },
        });

        const defModel = new pcf.ModelNode(this, { key: "DefinitionModel1", bisClass: bk.DefinitionModel, partitionClass: bk.DefinitionPartition });
        const phyModel = new pcf.ModelNode(this, { key: "PhysicalModel1", bisClass: bk.PhysicalModel, partitionClass: bk.PhysicalPartition });
        const sptModel = new pcf.ModelNode(this, { key: "SpatialLocationModel1", bisClass: bk.SpatialLocationModel, partitionClass: bk.SpatialLocationPartition });
        const infModel = new pcf.ModelNode(this, { key: "InformationRecordModel1", bisClass: bk.InformationRecordModel, partitionClass: bk.InformationRecordPartition });
        const grpModel = new pcf.ModelNode(this, { key: "GroupModel1", bisClass: bk.GroupModel, partitionClass: bk.GroupInformationPartition });
        const docModel = new pcf.ModelNode(this, { key: "DocumentListModel1", bisClass: bk.DocumentListModel, partitionClass: bk.DocumentPartition });

        const sptCategory = new pcf.ElementNode(this, { key: "SpatialCategory1", parent: defModel, bisClass: bk.SpatialCategory });
        const type = new pcf.MultiElementNode(this, { key: "Type", parent: defModel, dmo: elements.Type });
        const component = new pcf.MultiElementNode(this, { key: "Component", parent: phyModel, dmo: elements.Component, category: sptCategory });
        const facility = new pcf.MultiElementNode(this, { key: "Facility", parent: sptModel, dmo: elements.Facility, category: sptCategory });
        const floor = new pcf.MultiElementNode(this, { key: "Floor", parent: sptModel, dmo: elements.Floor, category: sptCategory });
        const space = new pcf.MultiElementNode(this, { key: "Space", parent: sptModel, dmo: elements.Space, category: sptCategory });
        const zone = new pcf.MultiElementNode(this, { key: "Zone", parent: grpModel, dmo: elements.Zone });
        const system = new pcf.MultiElementNode(this, { key: "System", parent: grpModel, dmo: elements.System });
        const doc = new pcf.MultiElementNode(this, { key: "COBieDocument", parent: docModel, dmo: elements.COBieDocument });

        // This is an example of using a for-loop to avoid defining multiple pcf manually
        for (const dmo of [elements.Assembly, elements.Attribute, elements.Contact, elements.Connection, elements.Resource, elements.Spare, elements.Job, elements.Issue, elements.Impact])
            new pcf.MultiElementNode(this, { key: dmo.classFullName, parent: infModel, dmo });

        new pcf.MultiRelationshipNode(this, {
            key: "ComponentConnectsToComponent",
            dmo: relationships.ComponentConnectsToComponent,
            source: component,
            target: component,
        });

        new pcf.MultiRelationshipNode(this, { 
            key: "ZoneIncludesSpaces",
            dmo: relationships.ZoneIncludesSpaces,
            source: zone,
            target: space,
        });

        new pcf.MultiRelationshipNode(this, { 
            key: "SystemGroupsComponents",
            dmo: relationships.SystemGroupsComponents,
            source: system,
            target: component,
        });

        new pcf.MultiRelatedElementNode(this, { 
            key: "ComponentAssemblesComponents",
            dmo: relatedElements.ComponentAssemblesComponents,
            source: component,
            target: component,
        });

        new pcf.MultiRelatedElementNode(this, { 
            key: "ComponentOwnsType",
            dmo: relatedElements.ComponentOwnsType,
            source: component,
            target: type,
        });

        new pcf.MultiRelatedElementNode(this, { 
            key: "FloorComposesSpaces",
            dmo: relatedElements.FloorComposesSpaces,
            source: floor,
            target: space,
        });
    }
}

export default new COBieConnector();

