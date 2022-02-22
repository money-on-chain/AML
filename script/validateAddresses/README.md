# Validator
The validator is a script that validates the users address for the AML service.

Pre requisites
------------
* Install node.js 14 or higher https://nodejs.org/en/download/
* Install mongoDB  https://docs.mongodb.com/manual/installation/

Installation
------------
To run the validator, pull the repository from GitHub and install its dependencies. You will need [yarn](https://yarnpkg.com/lang/en/docs/install/) or [npm](https://docs.npmjs.com/cli/install) installed.

    git clone https://github.com/money-on-chain/AML/
    cd AML/script/validateAddresses/
    `yarn install` or `npm install`


Configuration
------------
You must configure the address source of the database to validate and the database to impact the results of the validations. This is in the [config](https://github.com/money-on-chain/AML/tree/scriptValidateUsers/script/validateAddresses/config) file

```javascript
//DB config to impact validated address
export const mongoDataClient = {
    uri: "mongodb://127.0.0.1:27017/mongodb",
    db: "validationAML",
    collection: "validation",
    user: "",
    password: "",
}

//DB config to fetch address to validate
export const mongoDataDBToSearch = {
    uri: "mongodb://127.0.0.1:27017/mongodb",
    db: "localUsers",
    user: "",
    password:"",
    //the collection with the users (addresses) to validate
    collection: "users",
    //the field with the value of the addresses
    fieldToSearch: "address"
}
```
Also need to configure aml credential

```javascript
export const apiAmlCliente = {
    user: 'test',
    password: 'test',
    host: 'https://api.coinfirm.com/v3/',
    endpointToken: '/auth/login',
    endpointBlackListService: '/blacklist/addresses'
}
```

Usage
------------
Start the script
``` 
yarn start
```