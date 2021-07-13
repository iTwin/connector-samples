# Excel Connector Sample (COBie Schema)

This is a production-ready iTwin Connector sample that uses the [@itwin/pcf library](https://github.com/iTwin/pcf). 

# How to run it?

```console

# STEP 1
npm install

# STEP 2: 
# Add 1. app client ID 2. project ID 3. iModel ID 4. path to your COBie file in App.ts 

# STEP 3: 
# Run your connector
npm run start

# STEP 4: 
# make changes to your COBie file (e.g. add/update/delete rows)

# STEP 5: 
# Run your connector again to synchronize the modified cobie file with your iModel
npm run start 

```

Your can acquire COBie Sample files from [here](https://portal.nibs.org/files/wl/?id=oy5MyBRPiLx7ZmAomBRMgL62o1hi3YLk).

Don't forget to gitignore your App.ts file as it contains client specific info.

