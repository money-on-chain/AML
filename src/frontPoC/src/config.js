
import AmlVault from "../../../abi/AmlVault.json" assert { type: "json" };
import IETHAtomicOracle from "../../../abi/IETHAtomicOracle.json" assert { type: "json" };

export const HTTP_PROVIDER = "https://public-node.testnet.rsk.co";

export const abi = {
    amlVault: AmlVault,
    iethAtomicOracle: IETHAtomicOracle,
}
export const mocConfig = {
    addressSC: "0x3a983c7597b3ac4fbc3e0cf484d7631d70d04c05",
}
export const amlConfig = {
    addressSC: "0x3788c6Cee3805c9AF326A0346d83d1D0140f05e3",
    // addressSC: "0x2fCf5E60639e4ef50e9Fa74163655d3603dAFF74",
    // addressSC: "0xDaFAaA2B792d22a1d6F4Af880644062F73183D7f",
    // addressSC: "0x673D53c9bcDD08b4bA62af67B40430B902fF4f3c",
}
export const oracleConfig = {
    addressSC: "0xc2ebb4e0f43096e8681f8bfeaf03916bf7ca79a8",
}