
import { amlConfig, HTTP_PROVIDER, abi, oracleConfig, mocConfig2 } from './config.js';
import { ethers } from './ethers-5.2.esm.min.js'

export default class Main {

    constructor() {
        this.provider = '';
        this.signer = '';
        this.gasLimit = 3350000;
        this.aml;
        this.fee;
    }

    getAbi(abiName) {
        if (Object.prototype.hasOwnProperty.call(abi, abiName)) return abi[abiName]
        console.error(abiName, " abi not exit")
        return
    }

    async iniProvider() {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        //fix to rsk 
        const format = provider.formatter.formats
        format.receipt.root = format.receipt.logsBloom
        //set provider
        this.provider = provider;
        Object.assign(this.provider.formatter, { format });
        //set signer
        this.signer = signer;
        this.aml = new ethers.Contract(amlConfig.addressSC, this.getAbi('amlVault'), this.signer)
        this.fee = await this.getFeeOracle(amlConfig.addressSC);

        console.log("Account:", await signer.getAddress());
    }

    async validateProvider() {
        if ((!this.provider) || (this.signer)) {
            await this.iniProvider();
        }
    }

    async validateUser(user) {
        const addressUser = user.toLowerCase();
        await this.validateProvider();
        // const fee = await this.getFeeOracle(amlConfig.addressSC);
        console.log("validate user ...")
        let retorno = await this.aml.validateUser(addressUser, { value: this.fee, gasLimit: this.gasLimit });

        return retorno.wait()
            .then((validate) => {
                return true;
            })
            .catch((error) => {
                return false;
            })

    }
    async getFeeOracle(user) {
        console.log("validate user ...")
        this.oracle = new ethers.Contract(oracleConfig.addressSC, this.getAbi('iethAtomicOracle'), this.signer)
        let retorno = await this.oracle.getFee(user);
        console.log('fee -->', retorno);
        return retorno;

    }
    async mintDoc(amount) {
        console.log("mint ...")
        await this.validateProvider();
        console.log("amount:", amount);
        let retorno = await this.aml.mintDoc(amount, { value: '45000000000000', gasLimit: this.gasLimit });
        return retorno.wait()
            .then(() => {
                return true;

            })
            .catch((error) => {
                return false;
            })
    }
}