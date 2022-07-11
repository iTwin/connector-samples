/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as pcf from "@itwin/pcf";
import { PhysicalElement, PhysicalType } from "@itwin/core-backend";
import { StrengthDirection, strengthDirectionToString, strengthToString, StrengthType } from "@itwin/ecschema-metadata";

export const ComponentAssemblesComponents: pcf.RelatedElementDMO = {
  irEntity: "Assembly",
  fromAttr: "ParentName",
  fromType: "IREntity",
  toAttr: "ChildNames",
  toType: "IREntity",
  ecProperty: "parent",
  ecRelationship: {
    name: "ComponentAssemblesComponents",
    baseClass: "BisCore:PhysicalElementAssemblesElements",
    strength: strengthToString(StrengthType.Embedding),
    strengthDirection: strengthDirectionToString(StrengthDirection.Forward),
    source: {
      polymorphic: true,
      multiplicity: "(0..1)",
      roleLabel: "assembles",
      abstractConstraint: PhysicalElement.classFullName,
      constraintClasses: ["COBieDynamic:Component"],
    },
    target: {
      polymorphic: true,
      multiplicity: "(0..*)",
      roleLabel: "is assembled by",
      abstractConstraint: PhysicalElement.classFullName,
      constraintClasses: ["COBieDynamic:Component"],
    },
  },
};

export const FloorComposesSpaces: pcf.RelatedElementDMO = {
  irEntity: "Space",
  fromAttr: "FloorName",
  fromType: "IREntity",
  toAttr: "Name",
  toType: "IREntity",
  ecProperty: "composingElement",
  ecRelationship: {
    name: "FloorComposesSpaces",
    baseClass: "SpatialComposition:CompositeComposesSubComposites",
    strength: strengthToString(StrengthType.Embedding),
    strengthDirection: strengthDirectionToString(StrengthDirection.Forward),
    source: {
      polymorphic: true,
      multiplicity: "(0..1)",
      roleLabel: "is composed by",
      abstractConstraint: "SpatialComposition.CompositeElement",
      constraintClasses: ["COBieDynamic:Floor"],
    },
    target: {
      polymorphic: true,
      multiplicity: "(0..*)",
      roleLabel: "composes",
      abstractConstraint: "SpatialComposition.CompositeElement",
      constraintClasses: ["COBieDynamic:Space"],
    },
  },
};

export const ComponentOwnsType: pcf.RelatedElementDMO = {
  irEntity: "Component",
  fromAttr: "Name",
  fromType: "IREntity",
  toAttr: "TypeName",
  toType: "IREntity",
  ecProperty: "typeDefinition",
  ecRelationship: {
    name: "ComponentOwnsType",
    baseClass: "BisCore:ElementOwnsChildElements",
    strength: strengthToString(StrengthType.Embedding),
    strengthDirection: strengthDirectionToString(StrengthDirection.Forward),
    source: {
      polymorphic: true,
      multiplicity: "(0..1)",
      roleLabel: "has type",
      abstractConstraint: PhysicalElement.classFullName,
      constraintClasses: ["COBieDynamic:Component"],
    },
    target: {
      polymorphic: true,
      multiplicity: "(0..1)",
      roleLabel: "owned by element",
      abstractConstraint: PhysicalType.classFullName,
      constraintClasses: ["COBieDynamic:Type"],
    },
  },
};
