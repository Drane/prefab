/**
 * prefab is the a helper library that loads other helper libraries and 
 * servers their functions under its own variable space. E.g. prefab.otherLibMethod()
 */
var prefabCORE;
var extend = require("xtend");
//var prefabLOG = require("../prefabLOG");
//var UTIL = require('./lib/prefabUTIL.js');

// var prefabUTIL = require('./lib/prefabUTIL.js')({prefab: this});

module.exports = exports = prefabCORE = function prefabCORE_module(opts) {
	console.log("in prefabCORE");
	var cfg = merge(opts, {
		exp : {},
		mergeLibs: ["./prefabUTIL.js"]
	});

	function merge(opts, defaults) {
		return (opts ? extend({exp:exp},
				defaults, opts):extend({exp:exp},defaults));
	}

	function exp() {
		if (arguments.length > 0) {
			var argArray = Array.prototype.slice.call(arguments, 0,
					arguments.length);
			for ( var index in argArray) {
				Object.keys(argArray[index]).forEach(function(key) {
					cfg.exp[key] = argArray[index][key];
				});
			}
		}
		return cfg.exp;
	}

	cfg.exp.exp = exp;
	cfg.exp.merge = merge;
	
	cfg.mergeLibs.forEach(function(item){
		console.log("prefab merging lib: \""+item+"\"");
		cfg.exp = merge(cfg.exp, require(item)({prefab : cfg.exp}));
	});
	/*cfg.exp.util = require('./lib/prefabUTIL.js')({
		
	}); // did this from the util side
*/
	return cfg.exp;
};