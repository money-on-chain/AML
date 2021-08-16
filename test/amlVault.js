const AmlVault = artifacts.require("./AmlVault");
const WRBTC = artifacts.require("./test/MockETHAtomicOracle");

contract("AmlVault", async accounts => {
  it("getStatusForETH", async () => {
    const mockETHAtomicOracle = await MockETHAtomicOracle.new('1');
    const amlVault = await AmlVault.new(mockETHAtomicOracle);

    let result = await amlVault.receive({from: accounts[0], value: '10'});
    assert.equal(parseInt(result.returnData[0]), 0);
  });

});