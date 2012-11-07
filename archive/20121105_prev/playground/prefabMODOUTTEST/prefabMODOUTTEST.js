var prefabEXTRA;
var prefab = require('../../prefab')();

module.exports = exports = prefabEXTRA = function prefabEXTRA_module(opts){
	var cfg = prefab.merge(opts,{
	});
	
    console.log("in prefabEXTRA");
    
    function prefabEXTRA(){
    	
    }
    
    cfg.exp.prefabEXTRA = prefabEXTRA;
    
	return cfg.exp;
};