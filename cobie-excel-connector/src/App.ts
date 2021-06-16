import * as bk from "@bentley/imodeljs-backend";
import * as pcf from "@itwin/pcf";
import * as path from "path";

// App.ts contains all the parameters to start a connector job and the App.js created from this file will be the executable for your connector.
// CAUTION: You may not want to commit this file as it contains client-specific info.

export async function run() {
  await bk.IModelHost.startup();
  const app = new pcf.BaseApp({
    clientConfig: {
      clientId: "",
      redirectUri: "http://localhost:3000/signin-callback",
      scope: "connections:read connections:modify realitydata:read imodels:read imodels:modify library:read storage:read storage:modify openid email profile organization imodelhub context-registry-service:read-only product-settings-service general-purpose-imodeljs-backend imodeljs-router urlps-third-party projectwise-share rbac-user:external-client projects:read projects:modify validation:read validation:modify issues:read issues:modify forms:read forms:modify",
    },
    connectorModule: path.join(__dirname, "COBieConnector.js"),
    outputDir: path.join(__dirname, "output"),
    sourcePath: path.join(__dirname, "./assets/COBieV1.xlsx"),
    projectId: "",
    iModelId: "",
    env: pcf.Environment.Prod, // your may use QA/Dev if you're a Bentley Developer
  });
  await app.run();
  await bk.IModelHost.shutdown();
}

run();

