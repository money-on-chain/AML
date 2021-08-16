module.exports = async function ({getNamedAccounts, deployments}) { // HardhatRuntimeEnvironment
  const {deployer} = await getNamedAccounts()
  const {deploy, log} = deployments

  const deployResult = await deploy('AmlVault', {
    from: deployer,
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