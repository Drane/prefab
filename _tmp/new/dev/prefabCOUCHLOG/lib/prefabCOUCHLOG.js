/**
 * 
 */
var prefabCOUCHLOG;
var prefab = require('../../'+'prefab')();
var winston = require('winston');
var winstonTransports = require('winston-couchdb');
var pkg = require('./package.json');

module.exports = exports = prefabCOUCHLOG = function prefabCOUCHLOG_module(opts){
	var cfg = prefab._.extend(opts,{
		host: '192.168.199.128'
	});
	
    console.log("in prefabCOUCHLOG");
    
    function start(){
    	winston.add(winstonTransports.Couchdb, {
    		host: host
    	});
    	winston.add(winston.transports.File, { filename: pkg.name+'.log' });
    }
    cfg.exp.start = start;
    
    function test(){
    	winston.log('info', 'Hello distributed log files!');
    	winston.info('Hello again distributed logs');
    }
    cfg.exp.start = test;
    
    
	return cfg.exp;
};