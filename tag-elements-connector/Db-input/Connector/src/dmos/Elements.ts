import * as pcf from "@itwin/pcf";
import { PConnector } from "@itwin/pcf";

export const Vessel: pcf.ElementDMO = {
  irEntity: "Vessel",
  ecElement: "ProcessFunctional:Vessel",
  modifyProps(pc: PConnector, props: any, instance: pcf.IRInstance) {
    props.Manufacturer = instance.get("Manufacturer");
    props.Description = instance.get("Description");
  },
};

export const Heat_Exchanger: pcf.ElementDMO = {
  irEntity: "Heat_Exchanger",
  ecElement: "ProcessFunctional:Heat_Exchanger",
  modifyProps(pc: PConnector, props: any, instance: pcf.IRInstance) {
    props.Manufacturer = instance.get("Manufacturer");
    props.Description = instance.get("Description");
  },
};

export const Cooler: pcf.ElementDMO = {
  irEntity: "Cooler",
  ecElement: "ProcessFunctional:Cooler",
  modifyProps(pc: PConnector, props: any, instance: pcf.IRInstance) {
    props.Manufacturer = instance.get("Manufacturer");
    props.Description = instance.get("Description");
  },
};

export const Chiller: pcf.ElementDMO = {
  irEntity: "Chiller",
  ecElement: "ProcessFunctional:Chiller",
  modifyProps(pc: PConnector, props: any, instance: pcf.IRInstance) {
    props.Manufacturer = instance.get("Manufacturer");
    props.Description = instance.get("Description");
  },
};

export const Blower: pcf.ElementDMO = {
  irEntity: "Blower",
  ecElement: "ProcessFunctional:Blower",
  modifyProps(pc: PConnector, props: any, instance: pcf.IRInstance) {
    props.Manufacturer = instance.get("Manufacturer");
    props.Description = instance.get("Description");
  },
};


