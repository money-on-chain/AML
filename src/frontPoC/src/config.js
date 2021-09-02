
import AmlVault from "../abi/AmlVault.json" assert { type: "json" };
import IETHAtomicOracle from "../abi/IETHAtomicOracle.json" assert { type: "json" };

export const HTTP_PROVIDER = "https://public-node.testnet.rsk.co";

export const abi = {
    amlVault: AmlVault,
    iethAtomicOracle: IETHAtomicOracle,
}
export const mocConfig = {
    addressSC: "0x3a983c7597b3ac4fbc3e0cf484d7631d70d04c05",
}
export const amlConfig = {
    addressSC: "0x2D549b2f6280E03fFA3a7714B52258cc2cCa8F40",
    // addressSC: "0x58D90F1A187C83B69fCAe4BF69D463A38EccbEE2",
    // addressSC: "0x250D6D666Cad7e2A21BD254a7d9d283c74f4d87e",//pedro
    // addressSC: "0x11AD132D304B699E163B5B26835Ce74a13f1F25d",
    // addressSC: "0x3788c6Cee3805c9AF326A0346d83d1D0140f05e3",
    // addressSC: "0x2fCf5E60639e4ef50e9Fa74163655d3603dAFF74",
    // addressSC: "0xDaFAaA2B792d22a1d6F4Af880644062F73183D7f",
    // addressSC: "0x673D53c9bcDD08b4bA62af67B40430B902fF4f3c",
}
export const oracleConfig = {
    addressSC: "0xc2ebb4e0f43096e8681f8bfeaf03916bf7ca79a8",
}
export const mocConfig2 = {
    addressSC: "0x01ad6f8e884ed4ddc089fa3efc075e9ba45c9039",
}