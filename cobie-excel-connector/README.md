# Excel Connector Sample (COBie Schema)

This is a production-ready iTwin Connector sample that uses the [@itwin/pcf library](https://github.com/iTwin/pcf). It has ~500 lines of code that are purely object DEFINITIONS that could be linted by TypeScript Language Server. [Its predecessor](https://github.com/imodeljs/itwin-connector-sample) has ~2000 lines of code which are complex functions and difficult to make sense of.

You may find this sample a great reference to develop your own iTwin.js Connectors with twin-pcf.

## How to run it?

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

