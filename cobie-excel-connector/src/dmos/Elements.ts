import * as pcf from "@itwin/pcf";

export const Component: pcf.ElementDMO = {
    entity: "Component",
    classFullName: "COBieDynamic:Component",
    classProps: {
        name: "Component",
        baseClass: "BisCore.PhysicalElement",
    },
};

export const Type: pcf.ElementDMO = {
    entity: "Type",
    classFullName: "COBieDynamic:Type",
    classProps: {
        name: "Type",
        baseClass: "BisCore:PhysicalType",
    },
};

export const Space: pcf.ElementDMO = {
    entity: "Space",
    classFullName: "COBieDynamic:Space",
    classProps: {
        name: "Space",
        baseClass: "BuildingSpatial:Space",
    },
    modifyProps(props: any, instance: pcf.IRInstance) {
        props.footprintArea = instance.get("GrossArea");
    },
};

export const Floor: pcf.ElementDMO = {
    entity: "Floor",
    classFullName: "COBieDynamic:Floor",
    classProps: {
        name: "Floor",
        baseClass: "BuildingSpatial:RegularStory",
    },
};

export const Facility: pcf.ElementDMO = {
    entity: "Facility",
    classFullName: "COBieDynamic:Facility",
    classProps: {
        name: "Facility",
        baseClass: "BuildingSpatial:Building",
    },
};

export const Zone: pcf.ElementDMO = {
    entity: "Zone",
    classFullName: "COBieDynamic:Zone",
    classProps: {
        name: "Zone",
        baseClass: "BisCore:GroupInformationElement",
    },
};

export const System: pcf.ElementDMO = {
    entity: "System",
    classFullName: "COBieDynamic:System",
    classProps: {
        name: "System",
        baseClass: "BisCore:GroupInformationElement",
    },
};

export const Connection: pcf.ElementDMO = {
    entity: "Connection",
    classFullName: "COBieDynamic:Connection",
    classProps: {
        name: "Connection",
        baseClass: "BisCore:InformationRecordElement",
    },
};

export const Assembly: pcf.ElementDMO = {
    entity: "Assembly",
    classFullName: "COBieDynamic:Assembly",
    classProps: {
        name: "Assembly",
        baseClass: "BisCore:InformationRecordElement",
    },
};

export const Attribute: pcf.ElementDMO = {
    entity: "Attribute",
    classFullName: "COBieDynamic:Attribute",
    classProps: {
        name: "Attribute",
        baseClass: "BisCore:InformationRecordElement",
    },
};

export const Contact: pcf.ElementDMO = {
    entity: "Contact",
    classFullName: "COBieDynamic:Contact",
    classProps: {
        name: "Contact",
        baseClass: "BisCore:InformationRecordElement",
    },
};

export const Impact: pcf.ElementDMO = {
    entity: "Impact",
    classFullName: "COBieDynamic:Impact",
    classProps: {
        name: "Impact",
        baseClass: "BisCore:InformationRecordElement",
    },
};

export const Issue: pcf.ElementDMO = {
    entity: "Issue",
    classFullName: "COBieDynamic:Issue",
    classProps: {
        name: "Issue",
        baseClass: "BisCore:InformationRecordElement",
    },
};

export const Spare: pcf.ElementDMO = {
    entity: "Spare",
    classFullName: "COBieDynamic:Spare",
    classProps: {
        name: "Spare",
        baseClass: "BisCore:InformationRecordElement",
    },
};

export const Job: pcf.ElementDMO = {
    entity: "Job",
    classFullName: "COBieDynamic:Job",
    classProps: {
        name: "Job",
        baseClass: "BisCore:InformationRecordElement",
    },
};

export const Resource: pcf.ElementDMO = {
    entity: "Resource",
    classFullName: "COBieDynamic:Resource",
    classProps: {
        name: "Resource",
        baseClass: "BisCore:InformationRecordElement",
    },
};

export const COBieDocument: pcf.ElementDMO = {
    entity: "Document",
    classFullName: "COBieDynamic:COBieDocument",
    classProps: {
        name: "COBieDocument",
        baseClass: "BisCore:Document",
    },
};
