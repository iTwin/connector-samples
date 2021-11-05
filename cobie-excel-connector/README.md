# Excel Connector Sample (COBie Schema)

This is an iTwin Connector sample that uses the [@itwin/pcf](https://github.com/iTwin/pcf) connector framework.

# What's [COBie](https://en.wikipedia.org/wiki/COBie#:~:text=Construction%20Operations%20Building%20Information%20Exchange,COBie%20was%20designed%20by%20Dr.)?

COBie is an international standard for building data exchange. Its most common use is in product data handover from construction to operations. The COBie specifications and guidelines capture industry knowledge and best practices. The COBie standards do not dictate what information is required for a specific project handover. That responsibility still lies with the owner. The COBie data model is a subset (“smart filter”) of the buildingSMART data model, more commonly known as IFC (Industry Foundation Classes).

# How to run it?


## Acquire source file

1. Acquire the COBie Excel Sample file from [here](https://portal.nibs.org/files/wl/?id=oy5MyBRPiLx7ZmAomBRMgL62o1hi3YLk).
2. Place the Excel file under ./assets directory


## Register a new application

1. Go to developer.bentley.com
2. Register a new SPA App with scope "Visualization"


## Create a new iModel

1. Select a project and create an iModel on https://itwin.bentley.com
2. Go to the iModel page and extract Project ID & iModel ID from url ``` https://itwin.bentley.com/review/{Project ID}/{iModel ID}/{Change Set ID}/-1/ ```

## Install dependencies

```bash
npm install
```

## Run connector

In App.ts, add 1. Path to your COBie file 2. New App Client Info 3. Project ID and iModel ID

```bash
npm run start
```


## Update iModel

Make changes to your COBie file (e.g. try add/update/delete rows)

```bash
npm run start
```

**DO NOT forget to include App.ts in .gitignore as it contains client specific info that you may not want to share.**

# How does it work?

We will be following the steps described in [PCF tutorial](https://github.com/iTwin/pcf/tree/enhance-doc#tutorial) to explain how the COBie Connector works.

### Read from Excel with [XLSXLoader](https://github.com/iTwin/pcf/blob/main/core/src/loaders/XLSXLoader.ts)

[What is a Loader?](https://github.com/iTwin/pcf/tree/enhance-doc#pick-or-extend-aloader)

COBie files are xlsx files. PCF curates [XLSXLoader](https://github.com/iTwin/pcf/blob/main/core/src/loaders/XLSXLoader.ts) to allow you to read from any Excel/XLSX file. COBieConnector defines it in [here](https://github.com/iTwin/connector-samples/blob/d5dd3d2b78b3372f288e99ba4e256d3151dd0f52/cobie-excel-connector/src/COBieConnector.ts#L47) and it must be wrapped by a LoaderNode to be persisted as a [RepositoryLink Element](https://www.itwinjs.org/reference/imodeljs-backend/elements/repositorylink/) in iModel. It's always a good practice to always record Loader inside iModels to keep track of data sources.

Loaders are solely responsible for reading from data sources and transforming data into an [IRModel](https://github.com/iTwin/pcf/tree/enhance-doc#understand-the-irmodel). We're not concerned of schema/mapping at this point.

Now, it's important to pause and learn what an IRModel is. [What is an IRModel?](https://github.com/iTwin/pcf/tree/enhance-doc#understand-the-irmodel)

### Define mappings with DMO's

[What is a DMO?](https://github.com/iTwin/pcf/tree/enhance-doc#define-mappings-with-dynamic-mappingobjects-dmo)

XLSXLoader transforms each sheet into either IREntity or IRRelationship inside an IRModel stored in memory, and rows into IR Instances. The next step is to map IREntity & IRRelationship to either an existing EC Entity or a new dynamic EC Entity in iModel, and lastly create/update the instances of EC Entity based on IR Instances (represent rows in sheets).

For example, in any COBie file, there's a sheet called "Component", which will be represented by an [IREntity](https://github.com/iTwin/pcf/tree/enhance-doc#pcf-constructs) after XLSXLoader finishes. To map this IR Entity to an Element, we define an [ElementDMO](https://github.com/iTwin/connector-samples/blob/d5dd3d2b78b3372f288e99ba4e256d3151dd0f52/cobie-excel-connector/src/dmos/Elements.ts#L27) to achieve that.

| DMO | Location | Definition |
| -   | -        | -          |
| ElementDMO        | src/dmos/Elements.ts | Handles mappings for subclasses of [BIS Element](https://www.itwinjs.org/reference/imodeljs-backend/elements/element/) |
| RelationshipDMO   | src/dmos/Relationships.ts | Handles mappigns for subclasses of [BIS Relationship](https://www.itwinjs.org/reference/imodeljs-backend/relationships/relationship/) |
| RelatedElementDMO | src/dmos/RelatedElements.ts | Handles mappings for subclasses of [BIS RelatedElement](https://www.itwinjs.org/reference/imodeljs-common/entities/relatedelement/) |

There are three types of DMO divided into three separate source files. Once DMOs are defined, we can import them in [COBieConnector.ts](https://github.com/iTwin/connector-samples/blob/d5dd3d2b78b3372f288e99ba4e256d3151dd0f52/cobie-excel-connector/src/COBieConnector.ts#L16) and attach them to Nodes. 


### Define hierarchy with Nodes & attach DMO

[What is a Node?](https://github.com/iTwin/pcf/tree/enhance-doc#sketch-out-imodel-hierarchy-with-nodes-and-attachdmos)

It's time to define the hierarchy of our iModel with Nodes. We must define Nodes top to bottom so that lower-level Nodes can reference them. For example, [Component DMO](https://github.com/iTwin/connector-samples/blob/d5dd3d2b78b3372f288e99ba4e256d3151dd0f52/cobie-excel-connector/src/dmos/Elements.ts#L27) is attached to an ElementNode given that Component will be mapped to an Element class. In addition, each ElementNode also requires a reference to a ModelNode so that Element instances can be appropriately placed in a Model.

All the Nodes are defined under [COBieConnector.ts](https://github.com/iTwin/connector-samples/blob/main/cobie-excel-connector/src/COBieConnector.ts). ElementNode, RelationshipNode, and RelatedElementNode can attach ElementDMO, RelationshipDMO, and RelatedElementDMO respectively so that multiple instances of BIS Element, Relationship, RelatedElement can be populated.

### Run Connector

In [App.ts](https://github.com/iTwin/connector-samples/blob/main/cobie-excel-connector/src/App.ts), BaseApp is the driver of your Connector. It takes care of all the steps to sign in, download iModel, etc... This file is where you pass in client-specific credentials into your Connector app.

<!--
| Node | Definition |
| -    | -          |
| SubjectNode | Represents a Subject Element in iModel |
| ModelNode   | Represents a Model & Partition Element in iModel |
| LoaderNode  | Represents a RepositoryLink Element in iModel |
| ElementNode | Represents a normal Element in iModel |
-->

