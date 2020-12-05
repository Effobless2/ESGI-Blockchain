const ConvertLib = artifacts.require("ConvertLib");
const TodoList = artifacts.require("TodoList");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, TodoList);
  deployer.deploy(TodoList);
};
