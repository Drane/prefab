var prefabCORETEMPLATE;
var _ = require("undercore");

var exp = {_: _};



exp.merge = function merge(defaults, opts) {
	console.log("in:");
	console.log.apply(arguments);
    return _.extend({exp: {_:_}}, defaults, opts);
    console.log("out:");
    console.log.apply(arguments);
}

module.exports = exports = prefabCORETEMPLATE = function prefabCORETEMPLATE_module(opts){
	console.log("in prefab");
	var ctx = merge(exp,/*{
		exp: {
//			_: _,
//			merge: merge
		}
	}*/ opts);
    
    console.log("in prefabCORETEMPLATE");
    
    function prefabCORETEMPLATE(){
    	
    }
    
    cfg.exp.prefabCORETEMPLATE = prefabCORETEMPLATE;
    
	return cfg.exp;
};