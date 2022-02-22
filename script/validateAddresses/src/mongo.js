import MongoPkg from "mongodb"
const { MongoClient } = MongoPkg;
import { mongoDataClient } from '../config/config.js'

export default class Mongo {
    constructor(uri, dbName) {
        this.uri = uri
        this.dbName = dbName
        this.client = null
        this.db = null
        this.collection = null
    }


    async connect() {
        this.client = new MongoClient(this.uri , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await this.client.connect()
        this.db = this.client.db(this.dbName)
    }

    async insertMany(collection, docs) {
        // this option prevents additional documents from being inserted if one fails
        const options = { ordered: true };
        try {
            await this.connect()
            this.collection = this.db.collection(collection)
            const result = await this.collection.insertMany(docs, options);
        } catch (error) {
            console.error(error)
        } finally {
            this.client.close()

        }
    }
    async insertOne(doc, collectionToInsert) {
        try {
            await this.connect()
            const collection = this.db.collection(collectionToInsert)
            const result = await collection.insertOne(doc);
        } catch (error) {
            console.error(error)
        } finally {
            this.client.close()
        }
    }

    async findMany(collection, query = {}, options = {}) {
        let retorno = []
        try {
            let keyElements
            await this.connect()
            const cursor = this.db.collection(collection).find(query, options)
            // print a message if no documents were found
            if ((await cursor.count()) === 0) {
                console.log("No documents found!");
                return
            }
            if (!!options.projection) {
                keyElements = Object.keys(options.projection)[0].split(".")
            }
            await cursor.forEach((element) => { retorno.push((!keyElements) ? element : element[keyElements[0]]) })
        } catch (error) {
            console.error(error)
        } finally {
            this.client.close()
        }
        return retorno
    }

}