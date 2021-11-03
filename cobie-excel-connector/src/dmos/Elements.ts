/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as pcf from "@itwin/pcf";
import { GeometryStreamBuilder, GeometryParams } from "@bentley/imodeljs-common";
import { Point3d, LineString3d } from "@bentley/geometry-core";

export const FacilityCategory: pcf.ElementDMO = {
  irEntity: "Facility",
  ecElement: "BisCore:SpatialCategory",
};

export const FloorCategory: pcf.ElementDMO = {
  irEntity: "Floor",
  ecElement: "BisCore:SpatialCategory",
  doSyncInstance(instance: pcf.IRInstance) {
    if (instance.pkv.includes("/"))
      return false;
    return true;
  },
};

export const SpaceCategory: pcf.ElementDMO = {
  irEntity: "Space",
  ecElement: "BisCore:SpatialCategory",
};

export const Component: pcf.ElementDMO = {
  irEntity: "Component",
  ecElement: {
    name: "Component",
    baseClass: "BisCore:PhysicalElement",
  },
  categoryAttr: "Space",
  doSyncInstance(instance: pcf.IRInstance) {
    if (instance.get("Space").includes(","))
      return false;
    return true;
  },
};

export const Space: pcf.ElementDMO = {
  irEntity: "Space",
  ecElement: {
    name: "Space",
    baseClass: "BuildingSpatial:Space",
  },
  modifyProps(props: any, instance: pcf.IRInstance) {
    props.footprintArea = instance.get("GrossArea");
  },
  categoryAttr: "FloorName",
};

export const Coordinate: pcf.ElementDMO = {
  irEntity: "Coordinate",
  ecElement: {
    name: "COBieCoordinate",
    baseClass: "BuildingSpatial:Space",
  },
  modifyProps(props: any, instance: pcf.IRInstance) {
    const builder = new GeometryStreamBuilder();

    // props has category given categoryAttr is defined.
    const params = new GeometryParams(props.category);
    params.weight = 10;
    builder.appendGeometryParamsChange(params);

    const x = instance.get("CoordinateXAxis");
    const y = instance.get("CoordinateYAxis");
    const z = instance.get("CoordinateZAxis");
    const lineStr = LineString3d.createPoints([new Point3d(x, y, z)]);
    builder.appendGeometry(lineStr);

    props.geom = builder.geometryStream;
  },
  categoryAttr: "RowName",
};

export const Floor: pcf.ElementDMO = {
  irEntity: "Floor",
  ecElement: {
    name: "Floor",
    baseClass: "BuildingSpatial:RegularStory",
  },
  categoryAttr: "Name",
  doSyncInstance(instance: pcf.IRInstance) {
    if (instance.pkv.includes("/"))
      return false;
    return true;
  }
};

export const Facility: pcf.ElementDMO = {
  irEntity: "Facility",
  ecElement: {
    name: "Facility",
    baseClass: "BuildingSpatial:Building",
  },
  categoryAttr: "Name",
};

export const Type: pcf.ElementDMO = {
  irEntity: "Type",
  ecElement: {
    name: "Type",
    baseClass: "BisCore:PhysicalType",
  },
};

export const Zone: pcf.ElementDMO = {
  irEntity: "Zone",
  ecElement: {
    name: "Zone",
    baseClass: "BisCore:GroupInformationElement",
  },
};

export const System: pcf.ElementDMO = {
  irEntity: "System",
  ecElement: {
    name: "System",
    baseClass: "BisCore:GroupInformationElement",
  },
};

export const Connection: pcf.ElementDMO = {
  irEntity: "Connection",
  ecElement: {
    name: "Connection",
    baseClass: "BisCore:InformationRecordElement",
  },
};

export const Assembly: pcf.ElementDMO = {
  irEntity: "Assembly",
  ecElement: {
    name: "Assembly",
    baseClass: "BisCore:InformationRecordElement",
  },
};

export const Attribute: pcf.ElementDMO = {
  irEntity: "Attribute",
  ecElement: {
    name: "Attribute",
    baseClass: "BisCore:InformationRecordElement",
  },
};

export const Contact: pcf.ElementDMO = {
  irEntity: "Contact",
  ecElement: {
    name: "Contact",
    baseClass: "BisCore:InformationRecordElement",
  },
};

export const Impact: pcf.ElementDMO = {
  irEntity: "Impact",
  ecElement: {
    name: "Impact",
    baseClass: "BisCore:InformationRecordElement",
  },
};

export const Issue: pcf.ElementDMO = {
  irEntity: "Issue",
  ecElement: {
    name: "Issue",
    baseClass: "BisCore:InformationRecordElement",
  },
};

export const Spare: pcf.ElementDMO = {
  irEntity: "Spare",
  ecElement: {
    name: "Spare",
    baseClass: "BisCore:InformationRecordElement",
  },
};

export const Job: pcf.ElementDMO = {
  irEntity: "Job",
  ecElement:{
    name: "Job",
    baseClass: "BisCore:InformationRecordElement",
  },
};

export const Resource: pcf.ElementDMO = {
  irEntity: "Resource",
  ecElement: {
    name: "Resource",
    baseClass: "BisCore:InformationRecordElement",
  },
};

export const COBieDocument: pcf.ElementDMO = {
  irEntity: "Document",
  ecElement: {
    name: "COBieDocument",
    baseClass: "BisCore:Document",
  },
};
