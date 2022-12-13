// App.ts contains all the parameters to start a connector job and the App.js created from this file will be the executable for your connector.
// CAUTION: You may not want to commit this file as it contains client-specific info.

import { Logger, LogLevel } from "@bentley/bentleyjs-core";
import * as pcf from "@itwin/pcf";
import * as path from "path";
//Test
export async function main() {
  // define job specific arguments
  const jobArgs = new pcf.JobArgs({
    connectorPath: path.join(__dirname, "Connector.js"),
    // references an existing subject node defined in Connector.ts
    subjectNodeKey: "Subject-Tag",
    connection: {
      // references an existing loader defined in Connector.ts 
      loaderNodeKey: "sql-loader",
      kind: "pcf_api_connection", 
      baseUrl: "Server=#{server}\\sql;Database=#{database};Uid=#{user};Pwd=#{password};Encrypt=#{encrypt};TrustServerCertificate=#{trustServerCertificate}"    
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
      scope: "<%= clientScope %>"
    },
  });

  const app = new pcf.BaseApp(hubArgs);
  Logger.initializeToConsole();
  Logger.configureLevels({
    categoryLevels: [
      {
        category: pcf.LogCategory.PCF,
        logLevel: LogLevel[LogLevel.Info],
      },
    ]
  });
  await app.runConnectorJob(jobArgs);
}

main();

