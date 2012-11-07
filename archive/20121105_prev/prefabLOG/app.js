//require("node-codein");


var console = require('../prefab')({globalArg: global, opts: null});
//console.log(tester);
//global["console"] = null;
//var console = prefab.log;
//var temp = global.console;
//global.console = prefab.log;
//global.console = function(){
//	return prefab.log;
//};
//require('../prefab')({globalArg: global, opts: null});
//global = require('../prefab')({globalArg: global, opts: null});

//console.dir(global);
/*var prefab = require('../prefab')();
var console = prefab.log;
*///global.console = {};
//var prefab = require('../prefab')({mergeLibs: ['../prefabLOG/node_modules/node-codein']});

//console.dir(prefab);

//var logger = require('./prefabLOG')({});//globalConsole: true

//console.debug("test");
console.info("console test");
console2.info("console2 test");
//console.log("debug","test");
//console.log("DEBUG","test");

//console.log("CUSTOM LOGGER:");
prefab.log.testLog(console);
//console.log("\n\n");
//trace("yo");
//console.log("DEFAULT CONSOLE LOGGER:");
//logger.testLog(console);