/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as pcf from "@itwin/pcf";
import { PhysicalElement, GroupInformationElement, SpatialLocationElement } from "@itwin/core-backend";
import { StrengthDirection, strengthDirectionToString, strengthToString, StrengthType } from "@itwin/ecschema-metadata";

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
      abstractConstraint: "BisCore:PhysicalElement",
      constraintClasses: ["COBieDynamic:Component"],
    },
    target: {
      polymorphic: true,
      multiplicity: "(0..*)",
      roleLabel: "To Component",
      abstractConstraint: "BisCore:PhysicalElement",
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
      abstractConstraint: "BisCore:GroupInformationElement",
      constraintClasses: ["COBieDynamic:System"],
    },
    target: {
      polymorphic: true,
      multiplicity: "(0..*)",
      roleLabel: "Physical Component",
      abstractConstraint: "BisCore:PhysicalElement",
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
      abstractConstraint: "BisCore:GroupInformationElement",
      constraintClasses: ["COBieDynamic:Zone"],
    },
    target: {
      polymorphic: true,
      multiplicity: "(0..*)",
      roleLabel: "Spaces",
      abstractConstraint: "BisCore:SpatialLocationElement",
      constraintClasses: ["COBieDynamic:Space"],
    },
  },
};
