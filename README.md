# AML
Aml is a proof of concept of Coinfirm atomic oracle

This PoC are integrate for two parts.
* AmlVault: contract and test the solution.
* FrontEnd: is a demo of how to use it.


Installation
------------
To use the AmlVault, pull the repository from GitHub and install its dependencies. You will need [yarn](https://yarnpkg.com/lang/en/docs/install/) or [npm](https://docs.npmjs.com/cli/install) installed.

    git clone https://github.com/money-on-chain/AML
    cd AML
    yarn install --lock-file # or `npm install`

Usage
------------
1. Compile the contracts 
``` 
yarn compile
```
This will be secure that contacts compile and generate abis of them 


* **FrontEnd**: If you want to try the demo, not need instal anything because is in html.

But I recommend to turn on a simple web server to evit cors problems.

For example, in the [folder](https://github.com/money-on-chain/AML/tree/master/src/fronPoC) of front end 
``` 
python -m SimpleHTTPServer 8000  
```

Test
------------
Contract tests are defined under the tests [directory](https://github.com/money-on-chain/AML/tree/master/test). To use it, run:
``` 
yarn test 
```