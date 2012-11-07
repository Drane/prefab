var prefabOUT;
var prefab = require('../../prefab')();
var airport = require('airport');
var _ = require("underscore");



module.exports = exports = prefabOUT = function prefabOUT_module(opts){
	var cfg = prefab.merge(opts,{
		airPort : 7000,
		airHost : "localhost"
	});
	
	var srcName=cfg.pkg?
    		cfg.pkg.name+'@'+cfg.pkg.version:"no srcName";
	
    console.log("in prefabOUT");
    
    var air = airport(cfg.airHost, cfg.airPort);
    
    var up = {};
    
    function send(){
    	var argArray = _.toArray(arguments);
    	console.log("in send > argArray",argArray);
    	
    	key = "send";
    	console.log("connecting to "+srcName)
		up[key] = air.connect(srcName);
		up[key](function(remoteOutput) {
			console.log("<DEBUG> remoteOutput", remoteOutput);
			console.log("<DEBUG> argArray",argArray);
			remoteOutput.send(argArray);
		});
    	
    	/*if(cfg.dest){
    		key = "send";
    		up[key] = air.connect(output);
    		up[key](function(remoteOutput) {
    			debug("remoteOutput", remoteOutput);
    			debug("argArray",argArray);
    			remoteOutput.send(argArray);
    		});
    	}*/
    }
    
    cfg.exp.send = send;
	return cfg.exp;
};