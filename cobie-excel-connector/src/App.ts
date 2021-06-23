import * as bk from "@bentley/imodeljs-backend";
import * as pcf from "@itwin/pcf";
import * as path from "path";

// App.ts contains all the parameters to start a connector job and the App.js created from this file will be the executable for your connector.
// CAUTION: You may not want to commit this file as it contains client-specific info.

export async function main() {
  await bk.IModelHost.startup();
  const jobArgs = new pcf.JobArgs({
    loaderClass: pcf.XLSXLoader,
    connectorPath: path.join(__dirname, "COBieConnector.js"),
    con: {
      kind: "FileConnection",
      filepath: path.join(__dirname, "./assets/COBieV1.xlsx"),
    },
  });
  const hubArgs = new pcf.HubArgs({
    projectId: "",
    iModelId: "",
    env: pcf.Environment.Prod, // your may use QA/Dev for testing purposes if you're a Bentley Developer
    clientConfig: {
      clientId: "",
      redirectUri: "http://localhost:3000/signin-callback",
      scope: "connections:read connections:modify realitydata:read imodels:read imodels:modify library:read storage:read storage:modify openid email profile organization imodelhub context-registry-service:read-only product-settings-service general-purpose-imodeljs-backend imodeljs-router urlps-third-party projectwise-share rbac-user:external-client projects:read projects:modify validation:read validation:modify issues:read issues:modify forms:read forms:modify",
    },
  });
  const app = new pcf.BaseApp(jobArgs, hubArgs);
  await app.run();
  await bk.IModelHost.shutdown();
}

main();

