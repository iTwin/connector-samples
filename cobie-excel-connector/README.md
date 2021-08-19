# Excel Connector Sample (COBie Schema)

This is an iTwin Connector sample that uses the [@itwin/pcf library](https://github.com/iTwin/pcf).

# How to run it?

## Install

```bash
npm install
```

## Acquire source file

1. Acquire the COBie Excel Sample file from https://portal.nibs.org/files/wl/?id=oy5MyBRPiLx7ZmAomBRMgL62o1hi3YLk.
2. Place the Excel file under ./assets directory


## Register a new application

1. Go to developer.bentley.com
2. Register a new application with Application Type = SPA with necessary scopes (e.g., "Synchroniozation & Exports", "Digital Twin Management")


## Create a new iModel

1. Select a project and create an empty iModel under "iModel Manager" on connect.bentley.com
2. Go to the blank iModel and extract project ID & iModel ID from url "https://connect-imodelhubwebsite.bentley.com/Context/<projectId>/iModel/<iModelId>"


## Run connector

In App.ts, add 1. Path to your COBie file 2. New App Client Info 3. Project ID and iModel ID 

```bash
npm run start
```


## Update iModel

Make changes to your COBie file (e.g. try add/update/delete rows)

```bash
npm run start
```

Don't forget to include App.ts in .gitignore as it contains client specific info that you may not want to share.

