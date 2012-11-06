/**
 * prefabCORE is the a helper library that loads other helper libraries and
 * servers their functions under its own variable space. E.g.
 * prefab.otherLibMethod()
 */
var prefabCORE;
var extend = require("xtend");
var _ = require('underscore');
var debug = require('debug')('prefabCORE');

module.exports = exports = prefabCORE = function prefabCORE_module(opts) {
	var cfg = opts.prefab.merge(opts, {
		mergeLibs: {
			pkg: '../package.json',
			root: ["./prefabUTIL"]/*,
			log: "../../prefabLOG"*/
		}
	});
	
	debug('booting with cfg: %j', cfg);
	
	function exportFunction() {
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
	
	function each(list, iterator) {
//		console.log("list", list);
		Object.keys(list).forEach(function(key) {
			var value = list[key];
			iterator(value, key);
		});
	}

	cfg.exp.exp = exportFunction;
	cfg.exp.merge = cfg.prefab.merge;
	
	each(cfg.mergeLibs, function(value, key){
		console.log("=> merging '"+key+"' libs: \""+value+"\"");
		if(value instanceof Array){
			value.forEach(function(item){
				console.log("\t-> current array lib: \""+item+"\"");
//				console.log("pre cfg:");
//				console.dir(cfg);
				cfg.exp = cfg.prefab.merge(cfg.exp, require(item)({prefab : cfg.exp}));
//				console.log("post cfg:");
//				console.dir(cfg);
			});
		}else if(typeof value == 'string' || value instanceof String){
			console.log("\t-> current string lib: \""+value+"\"");
//			console.dir(require(value));
			debug('require(value): %j', require(value));
			var lib = {};
			var asset = require(value);
			if(_.isFunction(asset))
				lib[key] = asset({prefab : cfg.exp});
			else
				lib[key] = asset;
			
			cfg.exp = cfg.prefab.merge(cfg.exp, lib);
		}else{
			each(value, function(item, itemKey){
				console.log("\t-> current object lib: \""+item+"\"");
				var lib = {};
				lib[key] = require(item)({prefab : cfg.exp});
				cfg.exp = cfg.prefab.merge(cfg.exp, lib);
			});
		}
	});
	
//	cfg.mergeLibs.root.forEach(function(item){
//		console.log("prefabCORE merging root lib: \""+item+"\"");
//		cfg.exp = merge(cfg.exp, require(item)({prefab : cfg.exp}));
//	});
	
//	console.log("HIER cfg", cfg);
	
	return cfg.exp;
};