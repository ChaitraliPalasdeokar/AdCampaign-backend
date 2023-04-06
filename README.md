# Introduction
This respository contains backend APIs for Adcampaign project



# Build and Test

To convert typescript to javascript. Please run
```
npm run build
```

To run test. 

```$xslt
npm run test
``` 

To start the server. This will start the application on port 5000

```$xslt
npm run start
``` 

To start the server for development. This will monitor changes and restarts the application when it detects any changes 

```$xslt
npm run dev
``` 

# Folder Structure
```$xslt
src
└───index.ts          # Application entry point
└───routes            # Application endpoints
└───controllers       # Express route controllers for all the endpoints of the app
└───services          # Service layer with business logic
└───util              # Common logic
└───models            # Models for data type
``` 


