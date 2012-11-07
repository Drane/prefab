var prefabSHELL = require('./prefabSHELL.js');
for (cmd in prefabSHELL){
//	console.log("cmd",cmd);
	global[cmd] = prefabSHELL[cmd];
}

global.args = process.argv.slice(2);
/*
//This ensures we only execute the script targets after the entire script has
//been evaluated
var args = process.argv.slice(2);
*/