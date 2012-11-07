var prefabUTIL;
var extend = require("xtend");
var prefabLOG = require('../../prefabLOG')();
var airport = require('airport');

module.exports = exports = prefabUTIL = function prefabUTIL_module(opts) {
	console.log("in prefabUTIL");
	var cfg = {exp : {}};
	if(opts.prefab){
		init(opts.prefab)
	}
	
	function init(prefab){
		cfg = prefab.merge(opts, {
			airHost : 'localhost',
			airPort : 7000
		});
		
		prefab.exp({
			airHost : cfg.airHost,
			airPort : cfg.airPort,
			air : airport(cfg.airPort, cfg.airPort)
		});
	}

	

//	console.log(cfg);

	

	// function merge(opts, defaults) {
	// return (opts ? extend(defaults, opts) : defaults);
	// }

	// function prefabUTIL(){
	//    	
	// }

	cfg.exp.log = prefabLOG;
	
	return cfg.exp;
};