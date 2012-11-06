/**
 * prefab is the a library that loads other helper libraries and 
 * servers their functions under its own variable space. E.g. prefab.otherLibMethod()
 */
var prefab;
var pkg = require('./package.json');
var debug = require('debug')(pkg.name);
var extend = require("xtend");
var pCORE = require('./lib/prefabCORE');


module.exports = exports = prefab = function prefab_module(opts) {
	var cfg = merge(opts, {
	});
	
	debug('booting with cfg: %j', cfg);
	
	function merge(opts, defaults) {
        return (opts ? extend({exp: {}},defaults, opts) : extend({exp: {}},defaults));
    }
	cfg.exp.merge = merge;
	
	var prefabCORE = pCORE(merge(opts,{prefab: cfg.exp}));

//	console.log = function(d) {
//		process.stdout.write('prefab overwritten console log-> '+d + '\n');
//	};
	
	return prefabCORE;
//	return merge(exp, prefabCORE);
};