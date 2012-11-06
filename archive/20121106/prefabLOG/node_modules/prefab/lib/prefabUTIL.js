var prefabUTIL;
var util = require('util');
var _ = require('underscore');
var airport = require('airport');
var debug = require('debug')('prefabUTIL');

module.exports = exports = prefabUTIL = function prefabUTIL_module(opts) {
	var cfg = opts.prefab.merge(opts, {
		airHost : 'localhost',
		airPort : 7000
	});

	debug('booting with cfg: %j', cfg);
	
	cfg.prefab.exp({
		_: _,
		air: airport(cfg.airPort, cfg.airPort),
		log: { 
			log: basicLog,
			info: basicLog,
			warn: basicLog,
			error: basicLog,
			dir: basicLog,
			time: basicLog,
			timeEnd: basicLog,
			trace: basicLog,
			assert: basicLog 
		},
		toArgs: toArgs
	});
	
	function toArgs(){
		return [].slice.call(arguments, 0);
	}
	
	function basicLog(){
//		args = _.values(arguments);
//		debug('args: %j', args);
//		args.unshift('prefabUTIL.basicLog(): ');
//		debug('args: %j', args);
		
//		console.error.apply(this, util.format.apply(this,arguments));
		
		var prefix = "";//'prefabUTIL.basicLog(): '
		process.stdout.write(prefix+util.format.apply(this,arguments)+ '\n');
	}
	
// var cfg = {exp : {}};
// if(opts.prefab){
// init(opts.prefab)
// }
//	
// function init(prefab){
// // console.dir(prefab);
// cfg = prefab.merge(opts, {
// airHost : 'localhost',
// airPort : 7000
// });
//		
// prefab.exp({
// airHost : cfg.airHost,
// airPort : cfg.airPort,
// air : airport(cfg.airPort, cfg.airPort)
// });
// }
	
	return cfg.exp;
};