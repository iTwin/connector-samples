# Excel Connector Sample (COBie Schema)

This is a production-ready iTwin Connector sample that uses the [@itwin/pcf library](https://github.com/iTwin/pcf). It has ~500 lines of code that are purely object DEFINITIONS that could be linted by TypeScript Language Server. [Its predecessor](https://github.com/imodeljs/itwin-connector-sample) has ~2000 lines of code which are complex functions and difficult to make sense of.

You may find this sample a great reference to develop your own iTwin.js Connectors.

## How to run it?

```console

npm install

npm run build

# populates an iModel
npm run start

# make changes to ./lib/COBieV1.xlsx (e.g. add/update/delete rows)

# update an iModel
npm run start 

```