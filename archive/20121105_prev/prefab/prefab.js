/**
 * prefab is the a helper library that loads other helper libraries and 
 * servers their functions under its own variable space. E.g. prefab.otherLibMethod()
 */
var prefab;
var extend = require("xtend");
var prefabLOG = require("../prefabLOG");

module.exports = function(opts) {
	console.log("in prefab");
	var prefabCORE = require('./lib/prefabCORE')(opts);
	
	opts&&(opts.globalArg.prefab = prefabCORE);
	opts&&(opts.globalArg.console = prefabCORE.log);
	opts&&(opts.globalArg.console2 = prefabCORE.log);

//	var temp = prefabCORE.log;
//	opts.globalArg.console = prefabCORE.log;
//	return tester;
	return opts.globalArg;
//	return prefabCORE.log;
};