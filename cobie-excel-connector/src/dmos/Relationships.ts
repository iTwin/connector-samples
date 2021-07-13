/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as pcf from "@itwin/pcf";

const { PhysicalElement, GroupInformationElement, SpatialLocationElement } = pcf.imodeljs_backend;
const { StrengthDirection, strengthDirectionToString, strengthToString, StrengthType } = pcf.ecschema_metadata;

export const ComponentConnectsToComponent: pcf.RelationshipDMO = {
  irEntity: "Connection",
  fromAttr: "RowName1",
  fromType: "IREntity",
  toAttr: "RowName2",
  toType: "IREntity",
  ecRelationship: {
    name: "ComponentConnectsToComponent",
    baseClass: "BisCore:ElementRefersToElements",
    strength: strengthToString(StrengthType.Referencing),
    strengthDirection: strengthDirectionToString(StrengthDirection.Forward),
    source: {
      polymorphic: true,
      multiplicity: "(0..*)",
      roleLabel: "From Component",
      abstractConstraint: PhysicalElement.classFullName,
      constraintClasses: ["COBieDynamic:Component"],
    },
    target: {
      polymorphic: true,
      multiplicity: "(0..*)",
      roleLabel: "To Component",
      abstractConstraint: PhysicalElement.classFullName,
      constraintClasses: ["COBieDynamic:Component"],
    },
  },
};

export const SystemGroupsComponents: pcf.RelationshipDMO = {
  irEntity: "System",
  fromAttr: "Name",
  fromType: "IREntity",
  toAttr: "ComponentNames",
  toType: "IREntity",
  ecRelationship: {
    name: "SystemGroupsComponents",
    baseClass: "BisCore:ElementGroupsMembers",
    strength: strengthToString(StrengthType.Referencing),
    strengthDirection: strengthDirectionToString(StrengthDirection.Forward),
    source: {
      polymorphic: true,
      multiplicity: "(0..*)",
      roleLabel: "System",
      abstractConstraint: GroupInformationElement.classFullName,
      constraintClasses: ["COBieDynamic:System"],
    },
    target: {
      polymorphic: true,
      multiplicity: "(0..*)",
      roleLabel: "Physical Component",
      abstractConstraint: PhysicalElement.classFullName,
      constraintClasses: ["COBieDynamic:Component"],
    },
  },
};

export const ZoneIncludesSpaces: pcf.RelationshipDMO = {
  irEntity: "Zone",
  fromAttr: "Name",
  fromType: "IREntity",
  toAttr: "SpaceNames",
  toType: "IREntity",
  ecRelationship: {
    name: "ZoneIncludesSpaces",
    baseClass: "BisCore:ElementGroupsMembers",
    strength: strengthToString(StrengthType.Referencing),
    strengthDirection: strengthDirectionToString(StrengthDirection.Forward),
    source: {
      polymorphic: true,
      multiplicity: "(0..*)",
      roleLabel: "Zone",
      abstractConstraint: GroupInformationElement.classFullName,
      constraintClasses: ["COBieDynamic:Zone"],
    },
    target: {
      polymorphic: true,
      multiplicity: "(0..*)",
      roleLabel: "Spaces",
      abstractConstraint: SpatialLocationElement.classFullName,
      constraintClasses: ["COBieDynamic:Space"],
    },
  },
};
