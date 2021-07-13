# Excel Connector Sample (COBie Schema)

This is a production-ready iTwin Connector sample that uses the [@itwin/pcf library](https://github.com/iTwin/pcf). 

# How to run it?

```console

# STEP 1
npm install

# STEP 2: Add client ID, project ID, iModel ID, and path to your COBie file in App.ts 


# STEP 3
npm run build

# STEP 4: Run your connector
npm run start

# STEP 5 (optional): Update source data 
# make changes to your COBie file (e.g. add/update/delete rows)

# STEP 6 (optional): Run your connector again to update your existing iModel
npm run start 

```

Your can acquire COBie Sample files from [here](https://portal.nibs.org/files/wl/?id=oy5MyBRPiLx7ZmAomBRMgL62o1hi3YLk).

Don't forget to gitignore your App.ts file as it contains client specific info.

