var prefabOUT;
var prefab = require('prefab')();

module.exports = exports = prefabOUT = function prefabOUT_module(opts){
	var cfg = prefab.merge(opts,{
		airPort : 7000
	});
	
    console.log("in prefabOUT");
    
    function prefabOUT(){
    	
    }
    
    cfg.exp.prefabOUT = prefabOUT;
    
	return cfg.exp;
};