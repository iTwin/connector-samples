import { StrengthDirection, strengthDirectionToString, strengthToString, StrengthType } from "@bentley/ecschema-metadata";
import * as bk from "@bentley/imodeljs-backend";
import * as pcf from "@itwin/pcf";
import * as elements from "./Elements";

export const ComponentConnectsToComponent: pcf.RelationshipDMO = {
    entity: "Connection",
    fromAttr: "RowName1",
    fromType: "IREntity",
    toAttr: "RowName2",
    toType: "IREntity",
    classFullName: "COBieDynamic:ComponentConnectsToComponent",
    classProps: {
        name: "ComponentConnectsToComponent",
        baseClass: "BisCore:ElementRefersToElements",
        strength: strengthToString(StrengthType.Referencing),
        strengthDirection: strengthDirectionToString(StrengthDirection.Forward),
        source: {
            polymorphic: true,
            multiplicity: "(0..*)",
            roleLabel: "From Component",
            abstractConstraint: bk.PhysicalElement.classFullName,
            constraintClasses: [elements.Component.classFullName],
        },
        target: {
            polymorphic: true,
            multiplicity: "(0..*)",
            roleLabel: "To Component",
            abstractConstraint: bk.PhysicalElement.classFullName,
            constraintClasses: [elements.Component.classFullName],
        },
    },
};

export const SystemGroupsComponents: pcf.RelationshipDMO = {
    entity: "System",
    fromAttr: "Name",
    fromType: "IREntity",
    toAttr: "ComponentNames",
    toType: "IREntity",
    classFullName: "COBieDynamic:SystemGroupsComponents",
    classProps: {
        name: "SystemGroupsComponents",
        baseClass: "BisCore:ElementGroupsMembers",
        strength: strengthToString(StrengthType.Referencing),
        strengthDirection: strengthDirectionToString(StrengthDirection.Forward),
        source: {
            polymorphic: true,
            multiplicity: "(0..*)",
            roleLabel: "System",
            abstractConstraint: bk.GroupInformationElement.classFullName,
            constraintClasses: [elements.System.classFullName],
        },
        target: {
            polymorphic: true,
            multiplicity: "(0..*)",
            roleLabel: "Physical Component",
            abstractConstraint: bk.PhysicalElement.classFullName,
            constraintClasses: [elements.Component.classFullName],
        },
    },
};

export const ZoneIncludesSpaces: pcf.RelationshipDMO = {
    entity: "Zone",
    fromAttr: "Name",
    fromType: "IREntity",
    toAttr: "SpaceNames",
    toType: "IREntity",
    classFullName: "COBieDynamic:ZoneIncludesSpaces",
    classProps: {
        name: "ZoneIncludesSpaces",
        baseClass: "BisCore:ElementGroupsMembers",
        strength: strengthToString(StrengthType.Referencing),
        strengthDirection: strengthDirectionToString(StrengthDirection.Forward),
        source: {
            polymorphic: true,
            multiplicity: "(0..*)",
            roleLabel: "Zone",
            abstractConstraint: bk.GroupInformationElement.classFullName,
            constraintClasses: [elements.Zone.classFullName],
        },
        target: {
            polymorphic: true,
            multiplicity: "(0..*)",
            roleLabel: "Spaces",
            abstractConstraint: bk.SpatialLocationElement.classFullName,
            constraintClasses: [elements.Space.classFullName],
        },
    },
};
