# Excel Connector Sample (COBie Schema)

This is an iTwin Connector sample that uses the [@itwin/pcf library](https://github.com/iTwin/pcf).

# How to run it?

```console

# STEP 1
npm install

# STEP 2:
# In App.ts, add 1. App Client Info 2. Project ID 3. iModel ID 4. Path to your COBie file

# STEP 3:
# Run your connector
npm run start

# STEP 4:
# try making changes to your COBie file (e.g. add/update/delete rows)

# STEP 5:
# Run your connector again to synchronize the modified cobie file with your iModel
npm run start

```

Your can acquire a COBie Excel Sample file from [here](https://portal.nibs.org/files/wl/?id=oy5MyBRPiLx7ZmAomBRMgL62o1hi3YLk).

Don't forget to include App.ts in .gitignore as it contains client specific info.

