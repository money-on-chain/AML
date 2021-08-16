# Multicall <img width="100" align="right" alt="Multicall" src="https://user-images.githubusercontent.com/304108/55666937-320cb180-5888-11e9-907b-48ba66150523.png" />

Multicall aggregates results from multiple contract constant function calls.

This reduces the number of separate JSON RPC requests that need to be sent
(especially useful if using remote nodes like Infura), while also providing the
guarantee that all values returned are from the same block (like an atomic read)
and returning the block number the values are from (giving them important
context so that results from old blocks can be ignored if they're from an
out-of-date node).

For use in front-end dapps, this smart contract is intended to be used with
[Multicall.js](https://github.com/makerdao/multicall.js).

### Contract Addresses
| Chain   | Address |
| ------- | ------- |
| RSK Testnet   | [0x4eeebb5580769ba6d26bfd07be636300076d1831](https://explorer.testnet.rsk.co/address/0x4eeebb5580769ba6d26bfd07be636300076d1831) |
| RSK Mainnet   | [0x4eeebb5580769ba6d26bfd07be636300076d1831](https://explorer.rsk.co/address/0x4eeebb5580769ba6d26bfd07be636300076d1831) |



### Multicall2 Contract Addresses
Multicall2 is the same as Multicall, but allows to send transactions not just calls and provides additional functions that allow calls within the batch to fail. Useful for situations where a call may fail depending on the state of the contract.

| Chain   | Address |
| ------- | ------- |
| RSK Testnet   | [0xaf7be1ef9537018feda5397d9e3bb9a1e4e27ac8](https://explorer.testnet.rsk.co/address/0xaf7be1ef9537018feda5397d9e3bb9a1e4e27ac8) |
| RSK Mainnet   | [0x8f344c3b2a02a801c24635f594c5652c8a2eb02a](https://explorer.rsk.co/address/0x8f344c3b2a02a801c24635f594c5652c8a2eb02a) |