var prefabLOG;
var tracer = require('tracer');
var colors = require('colors');
var util = require('util');
var pkg = require('./package.json');
var debug = require('debug')(pkg.name.green);
var _ = require('underscore');


module.exports = exports = prefabLOG = function prefabLOG_module(opts){
	var prefab = opts.prefab||require('prefab')();
	var cfg = prefab.merge(opts, {
		methods: ['log','trace','debug','data','info','warn','error','fatal'],
		replaceConsole: true
    });
	
	debug('booting with cfg: %j', cfg);
	
	var log = tracer.colorConsole({
    	methods : cfg.methods,
    	dateformat : "HH:MM:ss",
    	preprocess :  function(data){
    		var msg = util.format.apply(this, data.args);
    		debug('\n\npreprocess data: %j', data);
//    		console.log("data.title", data.title);
//    		console.log("data.message", data.message);
			
    		if(data.title==="log"&&msg.substring(0,1)==="<"){
    			var lastGt = msg.indexOf("> ");
    			if(lastGt!=-1){
//    				console.log("lastGt!=-1 and value:",lastGt);
    				var title = msg.substring(1,lastGt).toLowerCase();
    				var titleIndex = _.indexOf(cfg.methods, title);
//    				console.log("title",title,"titleIndex",titleIndex);
    				if(titleIndex!=-1){
    					var message = msg.substring(lastGt+1);
    					data.title = title;
    					data.level = titleIndex;
//    					data.message = message;
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
//            var filterObj = {
//// log : colors.white,
// debug : colors.cyan,
// data : [colors.blue, colors.bold],
//    			fatal : colors.red
//// fatal : [ colors.red, colors.italic, colors.inverse]
//    		};
        },
//        filters : {
//			log : colors.white,
//			trace : colors.magenta,
//			debug : colors.cyan,
//			data : [colors.blue, colors.bold],
//			info : colors.green,
//			warn : colors.yellow,
//			error : [ colors.red, colors.bold],
//			fatal : [ colors.red, colors.italic, colors.inverse]
//		}
    });
	
	
	
    function testLog(logger){
    	var skip=(logger==console);
    	if(logger)log=logger;
    	log.log('hello');
    	log.trace('hello', 'world');
    	
    	if(skip)log.log('<DEBUG> hello %s', 'world', 123);
    	else log.debug('hello %s', 'world', 123);
    	
    	if(skip)log.log('<DATA> hello %s', 'world', 123);
    	else log.data('hello %s', 'world', 123);

    	log.info('hello %s %d', 'world', 123, {foo : 'bar'});
    	log.warn('hello %s %d %j', 'world', 123, {foo : 'bar'});
    	log.error('hello %s %d %j', 'world', 123, {foo : 'bar'}, [ 1, 2, 3, 4 ], Object);
    	
    	if(skip)log.log('<FATAL> hello %s %d %j', 'world', 123, {foo : 'bar'}, [ 1, 2, 3, 4 ], Object);
    	else log.fatal('hello %s %d %j', 'world', 123, {foo : 'bar'}, [ 1, 2, 3, 4 ], Object);
    	
    	prefab.log("\n");
    }
    function replaceConsole(){
    	debug("replacing default console");
    	console.log = function() {
//    		process.stdout.write('prefab overwritten console log-> '.red.bold
//    				+util.format.apply(this,arguments)+"\n");
//			log.log.apply(this, arguments);
			log.log(arguments);
		};
//		console.trace = function() {
//			log.trace.apply(this, arguments);
//		};
//		console.info = function() {
//			log.info.apply(this, arguments);
//		};
//		console.warn = function() {
//			log.warn.apply(this, arguments);
//		};
//		console.error = function() {
//			log.error.apply(this, arguments);
//		};
    }
    cfg.replaceConsole&&replaceConsole();
	
    cfg.exp.testLog = testLog;
    
    cfg.exp = prefab.merge(cfg.exp, log);
    
    prefab.log = cfg.exp;
    
	return ;
};