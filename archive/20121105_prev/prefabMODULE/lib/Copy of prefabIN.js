// The prefabIN module is used by the prefabMODULE to abstract away
// the input concept as much as possible.

// by [Jochen Szostek](http://prefabsoft.com/)
var prefabIN;
var prefab = require('../../prefab')();
//var airport = require('airport');
var _ = require("underscore");

module.exports = exports = prefabIN = function prefabIN_module(opts) {
	console.log("in prefabIN");
	var cfg = prefab.merge(opts, {});
	
	console.log("<DATA>",cfg);

	_.chain(cfg.data)
		.pairs()
		.each(function(pair) {
		var key = pair[0];
		var val = pair[1];
		console.log("key:", key, "val:", val);
	});

	// function connect() {
	// air(function(remote, conn) {
	//
	// });
	//		input: ['prefabLOGCLIENT'],//array of output points + semver

	// }
	//
	// function prefabIN() {
	//
	// }
	//
	// cfg.exp.prefabIN = prefabIN;

	return cfg.exp;
};