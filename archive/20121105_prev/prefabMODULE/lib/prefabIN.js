// The prefabIN module is used by the prefabMODULE to abstract away
// the input concept as much as possible.

// by [Jochen Szostek](http://prefabsoft.com/)
var prefabIN;
var prefab = require('../../prefab')();
var airport = require('airport');
var _ = require("underscore");

module.exports = exports = prefabIN = function prefabIN_module(opts) {
	console.log("in prefabIN");
	var cfg = prefab.merge(opts, {
		airPort : 7000,
		airHost : "localhost",
		autostart: true,
		src: null,
		dest: null
	});
	
	var srcName=cfg.pkg?
    		cfg.pkg.name+'@'+cfg.pkg.version:"no srcName";
	
//	console.log("<DATA>",cfg);
	var air = airport(cfg.airHost, cfg.airPort);

	/*_.chain(cfg.data)
		.pairs()
		.each(function(pair) {
		var key = pair[0];
		var val = pair[1];
		console.log("key:", key, "val:", val);
	});*/

	var up = {};
	
	function toTable(key, argArray){
		var from = cfg.src+"\n(prefabOUT)";
		var via = "---"+key+"--->\n("+argArray+")";
		var to = cfg.dest+"\n(prefabIN)";
		var srcName=cfg.pkg?
	    		cfg.pkg.name+'@'+cfg.pkg.version:"no srcName";
		return prefab.util.getFromViaToTable(from,via,to);
	}

	function connect() {
		console.log("hier");
		air(function(remote, conn) {
			var airCtx = this;
			var key = "send";
			airCtx[key] = function() {
				console.log("prefabIN>incoming> arguments",arguments);
				
			};
	   	}).listen(srcName);
    	console.info(srcName+' connected to airport');
	}

    if(cfg.autostart){
    	console.log(srcName+" auto listening for connections...");
    	connect();
    }
	
	return cfg.exp;
};