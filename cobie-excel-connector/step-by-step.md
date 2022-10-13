# Table of Contents

[Introduction](#introduction)

[Cloning the source](#cloning-the-source)

[Set up user, model, project, auth client](#set-up-user-model-project-auth-client)

[Installing](#installing)

[Building](#building)

[Running](#running)

[Dynamic Schema](#dynamic-schema)

[Appendix A - PCF Auth Client Quick Guide](#appendix-a)

## Introduction

The COBie Connector Sample demonstrates how to implement a dynamic
schema with PCF.

## Cloning the source

git clone <https://github.com/iTwin/connector-samples.git>

cd cobie-excel-connector

## Set up user, model, project, auth client

Edit the following members from hubArgs: projectID, iModelId, clientId,
clientSecret (Ref. Figure 6)

```typescript
  const hubArgs = new pcf.HubArgs({

    projectId: "<your project ID>",

    iModelId: "<your iModel ID>",

    clientConfig: {

      clientId: "<your client ID>",

      clientSecret: "<your client secret>",

      redirectUri: "http://localhost:3000/signin-callback",

      scope: "imodels:modify imodels:read",

      issuerUrl: "https://ims.bentley.com",

    },

  });
```

Auth Client

Note: with PCF, there are two choices for obtaining an auth token,
interactive and non-interactive

First you must create a client at [iTwin Platform
(bentley.com)](https://developer.bentley.com/)

![A screenshot of a computer Description automatically generated with
medium confidence](media/image1.jpeg){width="6.5in"
height="3.5208333333333335in"}

![A screenshot of a computer screen Description automatically
generated](media/image2.jpeg){width="6.5in"
height="3.5208333333333335in"}

Figure 1 Login and select \'My Apps\'

![Graphical user interface, text, application Description automatically
generated](media/image3.jpeg){width="6.5in"
height="3.5208333333333335in"}

Figure 2 Press 'Register New'

Interactive

![Graphical user interface, text, application Description automatically
generated](media/image4.jpeg){width="6.5in"
height="3.5208333333333335in"}

Figure 3 For an interactive authentication scheme, select
"desktop/mobile"

![Graphical user interface, text, application, email Description
automatically generated](media/image5.JPG){width="6.5in" height="4.9in"}

Figure 4 Use the redirectUri and scopes in App.ts

![Graphical user interface, text, application Description automatically
generated](media/image6.jpeg){width="6.5in"
height="3.5208333333333335in"}

Figure 5 - Once you save your native application, copy the client id

![Text Description automatically generated with medium
confidence](media/image7.JPG){width="6.5in"
height="1.9805555555555556in"}

Figure 6 Native client id goes here.

![Graphical user interface, website Description automatically
generated](media/image8.JPG){width="6.5in" height="3.841666666666667in"}

Figure 7 Interactive sign in with native app

Non-interactive

For a non-interactive authentication scheme, select "Service
Application"

![Graphical user interface, application Description automatically
generated](media/image9.jpeg){width="6.5in"
height="3.5208333333333335in"}

1. Select 'Service'

2. Give the application a name

3. Select 'Digital Twin Management'

4. Remove all unnecessary scopes. Only \"imodels:modify imodels:read\"
    are needed.

5. Press 'Save'

![Graphical user interface, application Description automatically
generated](media/image10.jpeg){width="6.5in"
height="3.5208333333333335in"}

Figure 8 Important follow the instruction and backup this secret -
you'll need it later

Note: you can regenerate the client secret if you lose it.

1. Dismiss this form once you've backed up the client secret

![](media/image11.jpg){width="6.5in" height="1.6954549431321084in"}

Figure 9 Copy the string beginning w \'service-\' from the Client ID
field from your newly created app

![Graphical user interface, text, application Description automatically
generated](media/image12.jpeg){width="6.5in"
height="3.5208333333333335in"}

Figure 10 Copy the client email too, you'll need to add it as a member
of your project.

There's one more final step for the service app. You'll need to make it
a member of your project.

Project and iModel

Next you need a Project and iModel to "connect" or publish your data to.
You can create a new iModel without leaving developer.bentley.com

![Graphical user interface, text, application Description automatically
generated](media/image13.jpeg){width="6.5in"
height="3.5208333333333335in"}

![](media/image14.jpg){width="6.496504811898513in"
height="3.5208333333333335in"}

Figure Copy iTwin (Project) ID and iModel ID

For service clients (non-interactive) only, the client email must be
added to the project as a participant like any other team member that
needs write permissions.

![](media/image15.jpeg){width="6.5in" height="2.3248173665791776in"}

Figure 12 Now that your model is created, press \"manage participants\"

![Graphical user interface, application Description automatically
generated](media/image16.jpeg){width="6.5in"
height="3.5208333333333335in"}

Figure 13 Add service client email here.

![](media/image17.jpeg){width="4.3538451443569555in"
height="2.3583333333333334in"}

Figure 14 locate your new iModel on the Hub at [Bentley Cloud
Services](https://connect.bentley.com/SelectProject/Index)

## Installing

npm install

## Building

![Graphical user interface, text, application Description automatically
generated](media/image18.jpeg){width="6.5in"
height="3.5208333333333335in"}

Figure Edit App.ts with Project iModel and client id and client secret
for non-interactive app

npm run build

## Running

![Graphical user interface, text, application Description automatically
generated](media/image19.jpeg){width="6.5in"
height="3.5208333333333335in"}

Figure 16 npm run start

![Text Description automatically
generated](media/image20.jpeg){width="6.5in"
height="3.5208333333333335in"}

Figure 17 Connector Job Completed

![Graphical user interface, text, application, email Description
automatically generated](media/image21.jpeg){width="6.5in"
height="3.5208333333333335in"}

Figure 18 Review Changes in iModel

![Graphical user interface, application Description automatically
generated](media/image22.jpeg){width="6.5in"
height="3.5208333333333335in"}

Figure 19 Review components in model tree

## Dynamic Schema

Please refer to [Implement A Dynamic Schema - iTwin.js
(itwinjs.org)](https://www.itwinjs.org/learning/implementadynamicschema/)

## Appendix A

PCF supports both interactive signin and non-interactive signin

For interactive sign-in, you need to create a native application

e.g.

``` batch
       "imjs_test_client_id":"native-XXXXXXX",
       "imjs_test_scopes":"imodels:modify imodels:read",
       "imjs_test_redirect_uri":"http://localhost:3000/signin-callback",
       "imjs_test_regular_user_name":"<email-here>",
       "imjs_test_regular_user_password":"<passwordhere>",
       "imjs_test_project_id":"<project id here>",
       "imjs_test_imodel_id":"<model id here>",
```

For non-interactive sign-in, you need to create a service application

e.g.

``` batch

        "imjs_test_client_id":"service-XXXXXXXXX\",
        "imjs_test_scopes":"imodels:modify imodels:read",
        "imjs_test_client_secret":"<client secret here>",
        "imjs_test_project_id":"<project id here>",
        "imjs_test_imodel_id":"<model id here>",

```

Create a client at developer.bentley.com

Scopes should be "imodels:modify imodels:read"

For interactive signin, you must specify redirect uri and user name
and password and that user must have write access to project

For non-interactive signin, you must specify a client secret
(generated by application form) AND the email corresponding to the form
(also generated by the too) must have write access to project (in lieu
of user name)

The project (iTwin) and model id should be on [Bentley Cloud
Services](https://connect.bentley.com/SelectProject/Index)
