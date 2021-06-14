import { StrengthDirection, strengthDirectionToString, strengthToString, StrengthType } from "@bentley/ecschema-metadata";
import * as bk from "@bentley/imodeljs-backend";
import * as pcf from "@itwin/pcf";
import * as elements from "./Elements";

export const ComponentAssemblesComponents: pcf.RelatedElementDMO = {
    entity: "Assembly",
    fromAttr: "ParentName",
    fromType: "IREntity",
    toAttr: "ChildNames",
    toType: "IREntity",
    classFullName: "COBieDynamic:ComponentAssemblesComponents",
    relatedPropName: "parent",
    classProps: {
        name: "ComponentAssemblesComponents",
        baseClass: "BisCore:PhysicalElementAssemblesElements",
        strength: strengthToString(StrengthType.Embedding),
        strengthDirection: strengthDirectionToString(StrengthDirection.Forward),
        source: {
            polymorphic: true,
            multiplicity: "(0..1)",
            roleLabel: "assmbles",
            abstractConstraint: bk.PhysicalElement.classFullName,
            constraintClasses: [elements.Component.classFullName],
        },
        target: {
            polymorphic: true,
            multiplicity: "(0..*)",
            roleLabel: "is assembled by",
            abstractConstraint: bk.PhysicalElement.classFullName,
            constraintClasses: [elements.Component.classFullName],
        },
    },
};

export const FloorComposesSpaces: pcf.RelatedElementDMO = {
    entity: "Space",
    fromAttr: "FloorName",
    fromType: "IREntity",
    toAttr: "Name",
    toType: "IREntity",
    classFullName: "COBieDynamic:FloorComposesSpaces",
    relatedPropName: "composingElement",
    classProps: {
        name: "FloorComposesSpaces",
        baseClass: "SpatialComposition:CompositeComposesSubComposites",
        strength: strengthToString(StrengthType.Embedding),
        strengthDirection: strengthDirectionToString(StrengthDirection.Forward),
        source: {
            polymorphic: true,
            multiplicity: "(0..1)",
            roleLabel: "is composed by",
            abstractConstraint: "SpatialComposition.CompositeElement",
            constraintClasses: [elements.Floor.classFullName],
        },
        target: {
            polymorphic: true,
            multiplicity: "(0..*)",
            roleLabel: "composes",
            abstractConstraint: "SpatialComposition.CompositeElement",
            constraintClasses: [elements.Space.classFullName],
        },
    },
};

export const ComponentOwnsType: pcf.RelatedElementDMO = {
    entity: "Component",
    fromAttr: "Name",
    fromType: "IREntity",
    toAttr: "TypeName",
    toType: "IREntity",
    classFullName: "COBieDynamic:ComponentOwnsType",
    relatedPropName: "typeDefinition",
    classProps: {
        name: "ComponentOwnsType",
        baseClass: "BisCore:ElementOwnsChildElements",
        strength: strengthToString(StrengthType.Embedding),
        strengthDirection: strengthDirectionToString(StrengthDirection.Forward),
        source: {
            polymorphic: true,
            multiplicity: "(0..1)",
            roleLabel: "has type",
            abstractConstraint: bk.PhysicalElement.classFullName,
            constraintClasses: [elements.Component.classFullName],
        },
        target: {
            polymorphic: true,
            multiplicity: "(0..1)",
            roleLabel: "owned by element",
            abstractConstraint: bk.PhysicalType.classFullName,
            constraintClasses: [elements.Type.classFullName],
        },
    },
};
