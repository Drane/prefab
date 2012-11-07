var prefabCORETEMPLATE;
var extend = require("xtend");

module.exports = exports = prefabCORETEMPLATE = function prefabCORETEMPLATE_module(opts){
	var cfg = merge(opts, {
        exp: {}
    });
    
    function merge(opts, defaults) {
        return (opts?extend(defaults,opts):defaults);
    }
    
    console.log("in prefabCORETEMPLATE");
    
    function prefabCORETEMPLATE(){
    	
    }
    
    cfg.exp.prefabCORETEMPLATE = prefabCORETEMPLATE;
    
	return cfg.exp;
};