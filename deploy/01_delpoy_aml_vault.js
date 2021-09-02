module.exports = async function ({ getNamedAccounts, deployments }) { // HardhatRuntimeEnvironment
  const { deployer } = await getNamedAccounts()
  const { deploy, log } = deployments

  const oracleAml = '0xc2ebb4e0f43096e8681f8bfeaf03916bf7ca79a8';
  const moc = '0x01AD6f8E884ed4DDC089fA3efC075E9ba45C9039';
  const defaultFlag = '0x0000000000000000000000000000000000000000000000000000000000000000';
  const clearFlag = '0x0000000000000000000000000000000000000000000000000000000000000021';
  const doc = '0x489049c48151924c07f86aa1dc6cc3fea91ed963'


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