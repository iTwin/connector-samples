/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as pcf from "@itwin/pcf";
import * as path from "path";

// App.ts contains all the parameters to start a connector job and the App.js created from this file will be the executable for your connector.
// CAUTION: You may not want to commit this file as it contains client-specific info.

export async function main() {
  const jobArgs = new pcf.JobArgs({
    // References a SubjectNode
    subjectNodeKey: "Duplex-Handover",
    // Points to a compiled connector class file
    connectorPath: path.join(__dirname, "COBieConnector.js"),
    connection: {
      // References a LoaderNode
      loaderNodeKey: "cobie-xlsx-loader",
      kind: "pcf_file_connection",
      filepath: path.join(__dirname, "../assets/2012-03-23-Duplex-Handover.xlsx"),
    },
  });
  const hubArgs = new pcf.HubArgs({
    projectId: "<your project ID>",
    iModelId: "<your iModel ID>",
    clientConfig: {
      clientId: "<your client ID>",
      redirectUri: "http://localhost:3000/signin-callback",
      scope: "imodels:modify imodels:read",
      issuerUrl: "https://qa-ims.bentley.com",
    },
  });
  const app = new pcf.BaseApp(hubArgs);
  await app.runConnectorJob(jobArgs);
}

main().catch((err) => console.log(err.message));

