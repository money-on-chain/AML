import { XMLHttpRequest } from "XMLHttpRequest";
import cache from "js-cache";
import { apiAmlCliente } from "../config/config.js";

export default class HttpRequest {

    constructor(ssl = 1) {
        this.http = new XMLHttpRequest()
        this.host = apiAmlCliente.host
        if (!ssl) {
            process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
        }

    }

    async sendGetRequestValidateAddress(address, type = 'ETH') {
        this.http = new XMLHttpRequest()
        const token = await this.getTokenCache();
        //set host + endpoint
        let uriService = this.host.concat(apiAmlCliente.endpointBlackListService)
        //set type and address
        // let borrar = '518d20bb443364419794ddca2e0cda3887a3f572'
        uriService = uriService.concat('/').concat(type).concat('/').concat(address)
        return new Promise((resolve, reject) => {

            this.http.addEventListener("readystatechange", function () {
                if ((this.readyState === 4) && (this.status === 200)) {
                    resolve(JSON.parse(this.responseText));
                }
            });
            this.http.addEventListener('error', reject)
            this.http.open("GET", uriService)
            this.http.setRequestHeader('Content-Type', 'application/json');
            this.http.setRequestHeader('Authorization', 'Bearer '.concat(token));
            this.http.send()

        })
    }

    async getTokenSso() {
        let http = new XMLHttpRequest()
        let data = {};
        data.email = apiAmlCliente.user
        data.password = apiAmlCliente.password
        const uriService = this.host.concat(apiAmlCliente.endpointToken)

        return new Promise((resolve, reject) => {
            http.addEventListener("readystatechange", function () {
                if ((this.readyState === 4) && (this.status === 200)) {
                    resolve(JSON.parse(this.responseText));
                    // console.log(JSON.parse(this.responseText));
                    // console.log(this.status);
                }
            });
            http.addEventListener('error', reject);
            http.open("POST", uriService, true)
            http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            http.send(JSON.stringify(data))
        });
    }

    async getTokenCache() {
        let token = cache.get('token')
        if (!token) {
            const response = await this.getTokenSso()
            //oauth2
            // cache.set('token', response.token_type.concat(' ', response.access_token), response.expires_in - 200)
            cache.set('token', response.token, 3600 - 200)
            token = cache.get('token')
        }
        return token;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}