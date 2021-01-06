const ConvertLib = artifacts.require("ConvertLib");
const SmartElection = artifacts.require("SmartElection");

module.exports = function(deployer) {
  deployer.deploy(SmartElection);
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, SmartElection);
};
