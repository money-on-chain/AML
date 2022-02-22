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
    db: "local_alpha_testnet_3",
    user: "",
    password:"",
    //the collection with the users (addresses) to validate
    collection: "UserState",
    //the field with the value of the addresses
    fieldToSearch: "address"
}

export const apiAmlCliente = {
    user: 'test',
    password: 'test',
    //host aml https://api.coinfirm.com/v3/
    //host mock 'https://ed82d533-0ae8-4476-853d-b1780378a258.mock.pstmn.io' 
    host: 'https://ed82d533-0ae8-4476-853d-b1780378a258.mock.pstmn.io',
    endpointToken: '/auth/login',
    endpointBlackListService: '/blacklist/addresses'
}

