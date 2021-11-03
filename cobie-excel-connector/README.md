# Excel Connector Sample (COBie Schema)

This is an iTwin Connector sample that uses the [@itwin/pcf library](https://github.com/iTwin/pcf).

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

## Classes

| Class Name | Location | Definition |
| -          | -        | -          |
| COBieConnector | [src/COBieConnector.ts](https://github.com/iTwin/connector-samples/blob/d5dd3d2b78b3372f288e99ba4e256d3151dd0f52/cobie-excel-connector/src/COBieConnector.ts#L16) | COBieConnector class is where everything is put together and you can readily learn the layout of your iModel by reading it. |
| BaseApp        | [src/App.ts](https://github.com/iTwin/connector-samples/blob/d5dd3d2b78b3372f288e99ba4e256d3151dd0f52/cobie-excel-connector/src/App.ts#L31) | BaseApp is the driver of your Connector. It takes care of all the steps to sign in, download iModel, etc... |

## DMOs

| DMO | Location | Definition |
| -   | -        | -          |
| ElementDMO        | dmos/Elements.ts        | |
| RelationshipDMO   | dmos/Relationships.ts   |  |
| RelatedElementDMO | dmos/RelatedElements.ts |  |

## Nodes

| Node | Definition |
| -    | -          |
| SubjectNode | Represents a Subject Element in iModel |
| LoaderNode  | Represents a RepositoryLink Element in iModel |
| ModelNode   | Represents a Model & Partition Element in iModel |
| ElementNode | Represents a normal Element in iModel |

