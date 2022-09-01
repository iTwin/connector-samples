# Connector Code Samples For Tagging Elements

# Introduction

This connector for iTwin, enables augmenting iModels with tagged elements. Tag information can be fetched from spreadsheet, json file or an API. Connector reads them and synchronizes with iModel using [@itwin/pcf](https://www.npmjs.com/package/@itwin/pcf) package.

## Getting Started

```sh
# make sure you have Node installed
node --version

# make sure your npm version is < 7.0.0
npm --version

# clone repo
git clone https://github.com/ashish-srivastava-dev/ConnectorSample.git
```

## Run Connector

### Excel input

Provide client-specific credentials in [App.ts](./Excel-input/Connector/src/App.ts) file before running connector.
Here is some sample code (App.ts) shown for [Excel spreadsheet](./Excel-input/Connector/src/assets/tag-sample.xlsx) as input file.

```sh
// in App.ts

 // define job specific arguments
  const jobArgs = new pcf.JobArgs({
    connectorPath: path.join(__dirname, "Connector.js"),

    // references an existing subject node defined in Connector.ts
    subjectKey: "Subject-Tag",
    connection: {

      // references an existing loader defined in Connector.ts
      loaderKey: "tag-xlsx-loader",
      kind: "pcf_file_connection",
      filepath: path.join(__dirname, "./assets/tag-sample.xlsx"),
    },
  });

   // define iModel Hub information
  const hubArgs = new pcf.HubArgs({
    projectId: "<Your Project ID Guid>",
    iModelId: "<Your iModel ID Guid>",

    // You must register your own client app and use its client ID (see https://developer.bentley.com)
    clientConfig: {
      clientId: "<%= clientId %>",
      redirectUri: "<%= clientRedirectUri %>",
      scope: "<%= clientScope %>",
    },
  });
```

This connector has been run and tested with "Bay Town Process Plant" iModel, which can be created from [Bentley supplied iModel Samples](https://developer.bentley.com/create-imodel/).
This iModel is already provisioned with [ProcessFunctional schema](https://github.com/iTwin/bis-schemas/blob/master/Domains/3-DisciplineOther/Plant/ProcessFunctional.ecschema.xml). Connector uses entity classes such as Vessel, Cooler, Chiller etc. (which are defined in ProcessFunctional schema) for tagging elements. For each entity, there should be a corresponding class defined [here](./Excel-input/Connector/src/dmos/Elements.ts).

[Here](https://github.com/iTwin/connector-samples) is some more information about writing connector using pcf library.

Now run the following scripts from [Excel-input](./Excel-input/Connector) folder where package.json resides.

```sh
1. npm install

2. npm run build (optional)

3. npm start

```

After giving 'npm start' command, connector would require user to authenticate and click on Allow button in the web browser when the 'Request for Approval' page appears.

### Json input

If there is input data stored in json file, refer the [App.ts](./Json-input/Connector/src/App.ts) for Json-input. Most of the steps are same as Excel input.

### API input

If the external data is fetched from API, (for demonstrating in the sample) [json server](https://www.npmjs.com/package/json-server) is used to generate a Mock API data. For running json server go to [json server](./Api-input/Connector/src/assets/json-server/) folder and run the following command.

```sh
json-server --watch db.json --port 3004
```

Refer the [App.ts](./Api-input/Connector/src/App.ts) for API-input.
