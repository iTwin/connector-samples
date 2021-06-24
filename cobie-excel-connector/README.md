# Excel Connector Sample (COBie Schema)

This is a production-ready iTwin Connector sample that uses the [@itwin/pcf library](https://github.com/iTwin/pcf). 

## Accessing COBie data stored in Excel format:
```typescript
// in App.ts
const jobArgs = new pcf.JobArgs({
  loaderClass: pcf.XLSXLoader,
  connectorPath: path.join(__dirname, "COBieConnector.js"),
  con: {
    kind: "FileConnection",
    filepath: path.join(__dirname, "./assets/COBieV1.xlsx"),
  },
});
```

## Create your mappings between COBie Schema and IR Model by defining [DMO](https://github.com/iTwin/pcf#constructs)'s:

```typescript
// in ./dmos/Elements.ts
export const Component: pcf.ElementDMO = {
    entity: "Component",
    classFullName: "COBieDynamic:Component",
    classProps: {
        name: "Component",
        baseClass: "BisCore.PhysicalElement",
    },
};
```

## Structure your iModel the way you like by defining [Node](https://github.com/iTwin/pcf#constructs)'s:
Nodes are defined in [COBieConnector](https://github.com/iTwin/connector-samples/blob/main/cobie-excel-connector/src/COBieConnector.ts)


Note: You may find this sample a great reference to develop your own iTwin Connectors with twin-pcf.

# How to run it?

```console

# STEP 1
npm install

# STEP 2: Add your own client ID, project ID, and iModel ID in App.ts 

# STEP 3
npm run build

# STEP 4: Run your connector
npm run start

# STEP 5 (optional): Update source data 
# make changes to ./lib/COBieV1.xlsx (e.g. add/update/delete rows)

# STEP 6 (optional): Run your connector again to update your existing iModel
npm run start 

```

