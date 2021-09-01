const ethers = require('ethers')

const AmlVault = require("../../../abi/AmlVault.json")
const IETHAtomicOracle = require("../../../abi/IETHAtomicOracle.json")

const HTTP_PROVIDER = "https://public-node.testnet.rsk.co";

const mocConfig = {
    addressSC: "0x3a983c7597b3ac4fbc3e0cf484d7631d70d04c05",
}
const amlConfig = {
    addressSC: "0x250D6D666Cad7e2A21BD254a7d9d283c74f4d87e",
}
const oracleConfig = {
    addressSC: "0xc2ebb4e0f43096e8681f8bfeaf03916bf7ca79a8",
}

const test = async () => {
    console.log("starting test ...")
    const provider = new ethers.providers.JsonRpcProvider('https://public-node.testnet.rsk.co')
    const aml = new ethers.Contract(amlConfig.addressSC, AmlVault, provider)

    const fee = await aml.callStatic.getFeeStatus('0x9C95B0EF2D3E1D9ca479524Ba738C87BE28C1585');
    console.log('fee', fee.toString())

    const validUser = await aml.callStatic.validateUser('0x9C95B0EF2D3E1D9ca479524Ba738C87BE28C1585', { value: fee, gasLimit: '3000000' });
    console.log('validUser', validUser)

    await aml.callStatic.mintDoc('21000000000000', { value: '22000000000000', gasLimit: '3000000', from: '0x9C95B0EF2D3E1D9ca479524Ba738C87BE28C1585'});
    console.log('callStatic minted doc')

}

test().then(console.log).catch(console.error)
