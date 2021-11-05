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
    subjectKey: "Duplex-Handover",
    connectorPath: path.join(__dirname, "COBieConnector.js"),
    connection: {
      loaderKey: "cobie-xlsx-loader",
      kind: "pcf_file_connection",
      filepath: path.join(__dirname, "../assets/2012-03-23-Duplex-Handover.xlsx"),
    },
  });
  const hubArgs = new pcf.HubArgs({
    projectId: "cef2040d-651e-4307-8b2a-dac0b44fbf7f",
    iModelId: "9949ce88-97ad-42e8-a3f1-046f8a7a5d22",
    clientConfig: {
      clientId: "spa-oGVHJyqrqU61ooywdsHiyIBBJ",
      redirectUri: "http://localhost:3000/signin-callback",
      scope: "openid projects:modify users:read itwinjs email organization profile projects:read",
      issuerUrl: "https://qa-ims.bentley.com",
    },
    env: pcf.Environment.QA,
  });
  const app = new pcf.BaseApp(jobArgs, hubArgs);
  await app.run();
}

main().catch((err) => console.log(err.message));

