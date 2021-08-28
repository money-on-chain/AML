module.exports = async function ({ getNamedAccounts, deployments }) { // HardhatRuntimeEnvironment
  const { deployer } = await getNamedAccounts()
  const { deploy, log } = deployments

  const oracleAml = '0xc2ebb4e0f43096e8681f8bfeaf03916bf7ca79a8';
  const moc = '0x01AD6f8E884ed4DDC089fA3efC075E9ba45C9039';
  const defaultFlag = '0x0000000000000000000000000000000000000000000000000000000000000000';
  const clearFlag = '0x0000000000000000000000000000000000000000000000000000000000000021';
  const doc = '0x4512f4C1d984bbf8B7f7404EddFb1881cFA79EfD'


  const deployResult = await deploy('AmlVault', {
    from: deployer,
    args: [oracleAml, moc, doc, defaultFlag, clearFlag],
    log: true,
  });

  if (deployResult.newlyDeployed) {
    log(
      `Contract AmlVault deployed at ${deployResult.address} using ${deployResult.receipt.gasUsed.toString()} gas`
    );
  }

  return true
};
module.exports.id = 'deploy_aml_vault'; // id required to prevent reexecution
module.exports.tags = ['AmlVault'];