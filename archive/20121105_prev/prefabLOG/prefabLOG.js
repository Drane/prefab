var prefabLOG;
var extend = require("xtend");
var tracer = require('tracer');
var _ = require('underscore');
var colors = require('colors');

module.exports = exports = prefabLOG = function prefabLOG_module(opts){
	var cfg = merge(opts, {
        exp: {},
        global: false,
        globalConsole: false,
		methods: ['log','trace','debug','data','info','warn','error','fatal'],
		consoleMethods: ['log','trace','info','warn','error'],
		overrideMethods: ['trace','info','warn','error'],
		filters : {
			log : colors.brown,
			debug : colors.cyan,
			data : [colors.blue, colors.bold],
			fatal : [ colors.red, colors.italic, colors.inverse]
		}
    });
	
	var notConsoleMethods=_.difference(cfg.methods,cfg.consoleMethods)
	
	console.log("_.difference(methods,consoleMethods)", notConsoleMethods);
	
    function merge(opts, defaults) {
        return (opts?extend(defaults,opts):defaults);
    }
    
    var log = tracer.colorConsole({
    	methods : cfg.methods,
//    	filters : cfg.filters,
    	dateformat : "HH:MM:ss",
    	preprocess :  function(data){
    		//CONVERT <xxx> MESSAGES TO NORMAL LOGGING IF xx IN cfg.methods
//    		console.log("data", data);
    		if(data.title==="log"&&data.message.substring(0,1)==="<"){
    			var lastGt = data.message.indexOf("> ");
    			if(lastGt!=-1){
//    				console.log("lastGt!=-1 and value:",lastGt);
    				var title = data.message.substring(1,lastGt).toLowerCase();
    				var titleIndex = _.indexOf(cfg.methods, title);
//    				console.log("title",title,"titleIndex",titleIndex);
    				if(titleIndex!=-1){
    					var message = data.message.substring(lastGt+1);
//    					console.log("titleIndex!=-1");
//    					console.log({"new title":title,"new level":titleIndex,"new msg":message});
    					data.title = title;
    					data.level = titleIndex;
    					data.message = message;
    				}
    			}
    		}
    		
            if(data.title==='error'){
                var callstack = '',len=data.stack.length;
                for(var i=0; i<len; i+=1){
                    callstack += '\n'+data.stack[i];
                }
                data.stacklist = callstack;
            }
            
            
            data.title = data.title.toUpperCase();
//            console.log("hier");
            var filterObj = {
//    			log : colors.white,
//    			debug : colors.cyan,
//    			data : [colors.blue, colors.bold],
    			fatal : colors.red
//            fatal : [ colors.red, colors.italic, colors.inverse]
    		};
        },
    });
    
//    var len = cfg.filters.length;
//    for ( var i = 0; i < len; i += 1) {
//		data.output = cfg.filters[i](data.output, data);
//		if (!data.output)
//			return data;
//		// cancel next process if return a false(include null, undefined)
//	}
    
    cfg.methods.forEach(function(item) {
    	cfg.exp[item]=log[item];
    });
//    
//    function testLogOld(logger){
//    	var skip=(logger==console);
//    	if(logger)log=logger;
//    	log.log('hello');
//    	log.trace('hello', 'world');
//    	!skip&&log.debug('hello %s', 'world', 123);
//    	!skip&&log.data('hello %s', 'world', 123);
//    	log.info('hello %s %d', 'world', 123, {foo : 'bar'});
//    	log.warn('hello %s %d %j', 'world', 123, {foo : 'bar'});
//    	log.error('hello %s %d %j', 'world', 123, {foo : 'bar'}, [ 1, 2, 3, 4 ], Object);
//    	!skip&&log.fatal('hello %s %d %j', 'world', 123, {foo : 'bar'}, [ 1, 2, 3, 4 ], Object);
//    	console.log("\n");filter
//	}
    function testLog(logger){
    	if(logger)log=logger;
    	log.log('hello');
    	log.trace('hello', 'world');
    	log.log('<DEBUG> hello %s', 'world', 123);
    	log.log('<DATA> hello %s', 'world', 123);
    	log.info('hello %s %d', 'world', 123, {foo : 'bar'});
    	log.warn('hello %s %d %j', 'world', 123, {foo : 'bar'});
    	log.error('hello %s %d %j', 'world', 123, {foo : 'bar'}, [ 1, 2, 3, 4 ], Object);
    	log.log('<FATAL> hello %s %d %j', 'world', 123, {foo : 'bar'}, [ 1, 2, 3, 4 ], Object);
    	console.log("\n");
    }

	    
    var originalConsole = {
    		log : console.log,
    		debug : console.debug,
    		info : console.info,
    		warn : console.warn,
    		error : console.error
    	};

    	function replaceConsole(logger) {
    		function replaceWith(fn) {
    			return function() {
    				fn.apply(logger, arguments);
    			};
    		}
    		cfg.overrideMethods.forEach(function(item) {
//    			if (item != 'log') {
    				if (console[item]) {
    					console[item] = replaceWith((item == 'debug') ? logger.info
    							: logger[item]);
    				} else {
    					console[item] = logger[item];
    				}
//    			}else{
//    				console.log = logger.log;
//    			}
    		});
//    		console['log']=logger['log'];
//    		console.log=(function() {
//    			  var orig=console.log;
//    			  return function() {
//    				  process.stdout.write("in return "+arguments + '\n');
//    			      logger.log(arguments);
////    			      logger.log.apply(logger, arguments);
//    			  };
//    			})();  

/*    		console.log=function() {
//    		  return function() {
    			process.stdout.write(this + '\n');
    			console.dir(this);
    			
    			return logger['log'].call(null,arguments);
//    		    	return logger.log;
//    		  };
    		};  */

    	}
        function restoreConsole() {
    		cfg.methods.forEach(function(item) {
    			console[item] = originalConsole[item];
    		});
    	}
        
        if(cfg.overrideConsole)nonConsoleLevelArray = replaceConsole(log);
    
/*
 * var originalConsole = { log : console.log, debug : console.debug, info :
 * console.info, warn : console.warn, error : console.error };
 * 
 * function replaceConsole(logger) { function replaceWith(fn) { return
 * function() { fn.apply(logger, arguments); }; }
 * cfg.overrideMethods.forEach(function(item) { // if (item != 'log') { if
 * (console[item]) { console[item] = replaceWith((item == 'debug') ? logger.info :
 * logger[item]); } else { console[item] = logger[item]; } // }else{ //
 * console.log = logger.log; // } // }); }
 * 
 * function restoreConsole() { cfg.methods.forEach(function(item) {
 * console[item] = originalConsole[item]; }); }
 * 
 * if(cfg.overrideConsole)nonConsoleLevelArray = replaceConsole(log);
 */
    function mapGlobalConsole(){
    	process.stdout.write("mapGlobalConsole" + '\n');
//    	global = (function(){ return this || (1,eval)('this') })();
    	console.log("global.console", global.console);
    	console.log("log", log);
		global['console'] = log;
// global = (function(){ return this || (1,eval)('this') })();
 console.log("global.console", global.console);
// global.console = log;
	}
    
    function mapGlobal(){
		function replaceWith(fn) {
			return function() {
				fn.apply(log, arguments);
			};
		}
		global = (function(){ return this || (1,eval)('this') })();
		
		cfg.methods.forEach(function(item) {
			global[item]=replaceWith(log[item]);
		});
	}
    
    cfg.globalConsole&&mapGlobalConsole();
    cfg.global&&mapGlobal();
    
    cfg.exp.testLog = testLog;
    
	return console=merge(cfg.exp, log);
};