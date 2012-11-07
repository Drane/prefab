// The prefabMODULE module is the main class for building modules
// than can be deployed to semver NodeJS server.
// Instead of connecting and listening on hosts and ports, you can 
// .connect() and .listen() on service semvers via 
// [airport / seaport](https://github.com/substack/airport)

// by [Jochen Szostek](http://prefabsoft.com/)
var prefabMODULE;
var prefab = require('../prefab')();

module.exports = exports = prefabMODULE = function prefabMODULE_module(opts){
	console.log("in prefabMODULE");
	var cfg = prefab.merge(opts,{
		pkg: null,
		input: null,
		output: null
	});
	
	if(cfg.output){
		
	}
    
    if(cfg.input){
    	var optsInput = cfg.input;
    	cfg.input = require('./lib/prefabIN')({
    		src: cfg.pkg.name,
    		dest: optsInput,//array of output points + semver
    		data : function(data){console.log(data);}
/*    		data : {
    			send : function(){
    				log("prefabMODULE>send>arguments", arguments);
    				var cb;

    				if (_.isFunction(arguments[arguments.length - 1])) {
    					log('last arg is cb');
    					cb = prefab.util.popArg(arguments);
    				}
    				argArray = prefab.util.parseArgs.apply(this, arguments);
    			}
    		}*/
    	});
    	
    	
    }
    
    function prefabMODULE(){
    	
    }
    
    cfg.exp.prefabMODULE = prefabMODULE;
    
	return cfg.exp;
};