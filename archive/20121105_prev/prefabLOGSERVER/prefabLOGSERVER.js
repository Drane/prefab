var prefabLOGSERVER;
var prefab = require('../prefab')();
prefab.log.testLog();
var prefabMODULE = require("../prefabMODULE")({
	pkg: require('./package.json'),
	input: ['prefabLOGCLIENT']//,//array of output points + semver
/*	input: function(){//acts as a filter for incoming data
		info("***=>hier komt echte impl received: ", arguments);
	}*/
});

module.exports = exports = prefabLOGSERVER = function prefabLOGSERVER_module(opts){
	console.log("in prefabLOGSERVER");
	var cfg = prefab.merge(opts,{
	});

	console.log("cfg", cfg);
	
	
	function start(){
		console.info("starting prefabLOGSERVER...");
    }
    
	return cfg.exp({start: start});
};