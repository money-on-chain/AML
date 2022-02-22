import { mongoDataClient, mongoDataDBToSearch } from '../config/config.js'
import Mongo from './mongo.js'
import HttpRequest from './httpRequest.js'

export default class Validator {

    constructor() {
        this.instanceMongoToSearch = new Mongo(mongoDataDBToSearch.uri, mongoDataDBToSearch.db)
        this.instanceMongo = new Mongo(mongoDataClient.uri, mongoDataClient.db)
        this.http = new HttpRequest()
    }

    async main() {
        await this.validateAddres(await this.getAddressToValidate())
    }


    async getAddressToValidate() {
        return await this.instanceMongoToSearch.findMany(mongoDataDBToSearch.collection, {}, { projection: { address: 1 } })
    }

    async saveValidation(validation) {
        await this.instanceMongo.insertOne(validation, mongoDataClient.collection)
    }

    async validateAddres(addressToValidate = Array()) {
        if (addressToValidate.length < 1) return
        for (let i = 0; i < addressToValidate.length; i++) {
            const address = addressToValidate[i]
            console.log('address to validate ', address)
            try {
                const validate = await this.http.sendGetRequestValidateAddress(address)
                await this.saveValidation(validate)
            } catch (error) {
                console.error('error',error)
            }
        }
    }


}

