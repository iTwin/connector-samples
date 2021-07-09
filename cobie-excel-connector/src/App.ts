import * as pcf from "@itwin/pcf";
import * as path from "path";

const { IModelHost } = pcf.imodeljs_backend;

// App.ts contains all the parameters to start a connector job and the App.js created from this file will be the executable for your connector.
// CAUTION: You may not want to commit this file as it contains client-specific info.

export async function main() {
  await IModelHost.startup();
  const jobArgs = new pcf.JobArgs({
    subjectKey: "cobie-subject-1",
    connectorPath: path.join(__dirname, "COBieConnector.js"),
    connection: {
      loaderKey: "cobie-xlsx-loader",
      kind: "pcf_file_connection",
      filepath: path.join(__dirname, "<relative path to your cobie excel file>"),
    },
  });
  const hubArgs = new pcf.HubArgs({
    projectId: "<your project ID>",
    iModelId: "<your iModel ID>",
    clientConfig: {
      clientId: "<your client ID>",
      redirectUri: "http://localhost:3000/signin-callback",
      scope: "connections:read connections:modify realitydata:read imodels:read imodels:modify library:read storage:read storage:modify openid email profile organization imodelhub context-registry-service:read-only product-settings-service general-purpose-imodeljs-backend imodeljs-router urlps-third-party projectwise-share rbac-user:external-client projects:read projects:modify validation:read validation:modify issues:read issues:modify forms:read forms:modify",
    },
  });
  const app = new pcf.BaseApp(jobArgs, hubArgs);
  await app.run();
  await IModelHost.shutdown();
}

main();

