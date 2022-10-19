# Excel Connector Sample (COBie Schema)

This is an iTwin Connector sample that uses the [@itwin/pcf](https://github.com/iTwin/pcf) connector framework.

## What's [COBie](https://en.wikipedia.org/wiki/COBie#:~:text=Construction%20Operations%20Building%20Information%20Exchange,COBie%20was%20designed%20by%20Dr.)?

COBie is an international standard for building data exchange. Its most common use is in product data handover from construction to operations. The COBie specifications and guidelines capture industry knowledge and best practices. The COBie standards do not dictate what information is required for a specific project handover. That responsibility still lies with the owner. The COBie data model is a subset (“smart filter”) of the buildingSMART data model, more commonly known as IFC (Industry Foundation Classes).

## How to run it?

Follow the steps below or refer to this [Step by Step Guide](step-by-step.md) to walk you through the process.

### Acquire source file

1. Acquire the COBie Excel Sample file from [here](https://portal.nibs.org/files/wl/?id=oy5MyBRPiLx7ZmAomBRMgL62o1hi3YLk).
2. Place the Excel file under ./assets directory

### Register a new application

1. Go to developer.bentley.com
2. Register either a new service application (non-interactive) or native application (interactive).  Refer to the [Step by Step Guide](step-by-step.md) for a detailed guide for creating an [Interactive](step-by-step#interactive) or [Non-interactive](step-by-step#non-interactive) authentication client.

### Create a new iModel

1. Select a project and create an iModel on https://itwin.bentley.com
2. Go to the iModel page and extract Project ID & iModel ID from url ``` https://itwin.bentley.com/review/{Project ID}/{iModel ID}/{Change Set ID}/-1/ ```

### Install dependencies

```bash
npm install
```

### Run connector

In App.ts, add 1. Path to your COBie file 2. New App Client Info 3. Project ID and iModel ID

```bash
npm run start
```


### Update iModel

Make changes to your COBie file (e.g. try add/update/delete rows)

```bash
npm run start
```

**DO NOT forget to include App.ts in .gitignore as it contains client specific info that you may not want to share.**

## How does it work?

We will be following the steps described in the [PCF tutorial](https://github.com/iTwin/pcf/tree/enhance-doc#tutorial) to explain how the COBie Connector works.

### Read from Excel with [XLSXLoader](https://github.com/iTwin/pcf/blob/main/core/src/loaders/XLSXLoader.ts)

[What is a Loader?](https://github.com/iTwin/pcf/tree/enhance-doc#pick-or-extend-aloader)

COBie files are xlsx files. PCF curates [XLSXLoader](https://github.com/iTwin/pcf/blob/main/core/src/loaders/XLSXLoader.ts) to enable COBieConnector to read from any Excel/XLSX file. Note, you could also write your own version of XLSXLoader or extend the existing one to customize the logic of reading from Excel files. (e.g., reading from more than one Excel file)

Loaders are solely responsible for reading and transforming an external data model into an [IRModel](https://github.com/iTwin/pcf/tree/enhance-doc#understand-the-irmodel), without concern of schema and mapping.

[What is an IRModel?](https://github.com/iTwin/pcf/tree/enhance-doc#understand-the-irmodel)

### Define mappings with DMO's

[What is a DMO?](https://github.com/iTwin/pcf/tree/enhance-doc#define-mappings-with-dynamic-mappingobjects-dmo)

```
An Excel/XLSX file => An IR Model
Sheets             => IR Entities / IR Relationships
Rows               => IR Instances
```

XLSXLoader transforms each sheet into either IR Entity or IR Relationship inside an IR Model stored in memory, and rows into IR Instances. The next step is to map IR Entity & IR Relationship to either an existing [EC Entity class](https://www.itwinjs.org/bis/ec/ec-entity-class/) or a new dynamic EC Entity class in iModel, and lastly create/update the instances of these classes based on the IR Instances (converted from the rows in sheets).

A set of dynamic EC Entity classes represents a dynamic schema in EC terms. [Why is a dynamic schema necessary sometimes?](https://www.itwinjs.org/bis/intro/schema-customization/)

For example, in any COBie file, there's a sheet called "Component", which will be represented by an [IR Entity](https://github.com/iTwin/pcf/tree/enhance-doc#pcf-constructs) after XLSXLoader finishes running. To map this IR Entity to an EC Entity class, we define an [ElementDMO](https://github.com/iTwin/connector-samples/blob/d5dd3d2b78b3372f288e99ba4e256d3151dd0f52/cobie-excel-connector/src/dmos/Elements.ts#L27) that references the name of that IR Entity. Since each IR Entity preserves the name of each Excel sheet, we would use "Component" as the value for the ElementDMO.irEntity field.

```typescript
// in dmos/Elements.ts
export const Component: pcf.ElementDMO = {
  irEntity: "Component",
  ...
}
```

| DMO | Location | Definition |
| -   | -        | -          |
| ElementDMO        | src/dmos/Elements.ts | Handles mappings for subclasses of [Element](https://www.itwinjs.org/reference/imodeljs-backend/elements/element/) |
| RelationshipDMO   | src/dmos/Relationships.ts | Handles mappings for subclasses of [Relationship](https://www.itwinjs.org/reference/imodeljs-backend/relationships/relationship/) |
| RelatedElementDMO | src/dmos/RelatedElements.ts | Handles mappings for subclasses of [RelatedElement](https://www.itwinjs.org/reference/imodeljs-common/entities/relatedelement/) |

There are three types of DMO divided into three separate source files. Once DMOs are defined, we can import them in [COBieConnector.ts](https://github.com/iTwin/connector-samples/blob/d5dd3d2b78b3372f288e99ba4e256d3151dd0f52/cobie-excel-connector/src/COBieConnector.ts#L16) and attach them to Nodes. 


### Define hierarchy with Nodes & attach DMO

[What is a Node?](https://github.com/iTwin/pcf/tree/enhance-doc#sketch-out-imodel-hierarchy-with-nodes-and-attachdmos)

It's now time to define the hierarchy of our iModel with Nodes. Nodes must be defined in a top-to-bottom fashion so that the lower-level Nodes can reference the higher-level ones. For example, ModelNodes are defined before ElementNodes because ElementNodes reference them, implicitly meaning a [Model](https://www.itwinjs.org/bis/intro/model-fundamentals/) must be inserted/updated before inserting/updating [Element](https://www.itwinjs.org/bis/intro/element-fundamentals/) instances in it. 

  [Component DMO](https://github.com/iTwin/connector-samples/blob/d5dd3d2b78b3372f288e99ba4e256d3151dd0f52/cobie-excel-connector/src/dmos/Elements.ts#L27) is attached to an ElementNode because the "Component" sheet is mapped to an [Element class](https://www.itwinjs.org/reference/imodeljs-backend/elements/element/) through ComponentDMO (Element class subclasses [the EC Entity class](https://www.itwinjs.org/reference/imodeljs-backend/schema/entity/)), which creates a dynamic EC Entity class "COBieDynamic:Component" that subclasses [PhysicalElement](https://www.itwinjs.org/reference/imodeljs-backend/elements/physicalelement/). A [ModelNode](https://github.com/iTwin/connector-samples/blob/2341379dab47a52b8aa45db35294b660df0806f4/cobie-excel-connector/src/COBieConnector.ts#L40) (with modelClass = PhysicalModel) is a higher-level Node that must be defined prior to Component ElementNode because the definition of each ElementNode must include a reference to a ModelNode so that the Element instances can be appropriately placed in a [Model](https://www.itwinjs.org/bis/intro/model-fundamentals/). The same applies to [Category](https://www.itwinjs.org/bis/intro/categories/).

```typescript
// in COBieConnector.ts
const phyModel = new pcf.ModelNode(this, { key: "PhysicalModel1", subject: subject1, modelClass: PhysicalModel, partitionClass: PhysicalPartition });
const spaceCategory = new pcf.ElementNode(this, { key: "SpaceCategory", model: defModel, dmo: elements.SpaceCategory });
const component = new pcf.ElementNode(this, { key: "Component", model: phyModel, dmo: elements.Component, category: spaceCategory });
```

All the Nodes are defined under [COBieConnector.ts](https://github.com/iTwin/connector-samples/blob/main/cobie-excel-connector/src/COBieConnector.ts). ElementNode, RelationshipNode, and RelatedElementNode can attach ElementDMO, RelationshipDMO, and RelatedElementDMO respectively so that multiple instances of Element, Relationship, RelatedElement classes can be populated.

### Run COBieConnector

[App.ts](https://github.com/iTwin/connector-samples/blob/main/cobie-excel-connector/src/App.ts) is the main file and uses the BaseApp class as the driver of COBieConnector. BaseApp takes care of all the steps to sign in, download Briefcase iModel, and purge it when necessary. This file is where you include client-specific credentials & job-specific parameters for COBieConnector.

<!--
| Node | Definition |
| -    | -          |
| SubjectNode | Represents a Subject Element in iModel |
| ModelNode   | Represents a Model & Partition Element in iModel |
| LoaderNode  | Represents a RepositoryLink Element in iModel |
| ElementNode | Represents a normal Element in iModel |
-->
