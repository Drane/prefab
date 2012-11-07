var prefabLOG;
var extend = require("xtend");
var tracer = require('tracer');

module.exports = exports = prefabLOG = function prefabLOG_module(opts){
	var cfg = merge(opts, {
        exp: {},
        overrideConsole: true,
        global: true,
		methods: ['log','trace','debug','data','info','warn','error','fatal'],
		consoleMethods: ['log','trace','info','warn','error'],
		overrideMethods: ['trace','info','warn','error']
    });
	
    function merge(opts, defaults) {
        return (opts?extend(defaults,opts):defaults);
    }
    
    var log = tracer.colorConsole({
    	methods : cfg.methods,
    	dateformat : "HH:MM:ss",
    	preprocess :  function(data){
            if(data.title==='error'){
                var callstack = '',len=data.stack.length;
                for(var i=0; i<len; i+=1){
                    callstack += '\n'+data.stack[i];
                }
                data.stacklist = callstack;
            }
            data.title = data.title.toUpperCase();
        }
    });
    
    cfg.methods.forEach(function(item) {
    	cfg.exp[item]=log[item];
    });
    
    function testLog(logger){
    	var skip=(logger==console);
    	if(logger)log=logger;
    	log.log('hello');
    	log.trace('hello', 'world');
    	!skip&&log.debug('hello %s', 'world', 123);
    	!skip&&log.data('hello %s', 'world', 123);
    	log.info('hello %s %d', 'world', 123, {foo : 'bar'});
    	log.warn('hello %s %d %j', 'world', 123, {foo : 'bar'});
    	log.error('hello %s %d %j', 'world', 123, {foo : 'bar'}, [ 1, 2, 3, 4 ], Object);
    	!skip&&log.fatal('hello %s %d %j', 'world', 123, {foo : 'bar'}, [ 1, 2, 3, 4 ], Object);
    	console.log("\n");
	}

	    
/*    var originalConsole = {
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
//			if (item != 'log') {
				if (console[item]) {
					console[item] = replaceWith((item == 'debug') ? logger.info
							: logger[item]);
				} else {
					console[item] = logger[item];
				}
//			}else{
//				console.log = logger.log;
//			}
//		});
	}
	
    function restoreConsole() {
		cfg.methods.forEach(function(item) {
			console[item] = originalConsole[item];
		});
	}
    
    if(cfg.overrideConsole)nonConsoleLevelArray = replaceConsole(log);
    */
    cfg.globalConsole&&function mapGlobalConsole(){
		global['console'] = log;
//		global = (function(){ return this || (1,eval)('this') })();
//		console.log("global.console", global.console);
//		global.console = log;
	}
    
    cfg.global&&function mapGlobal(){
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
    
    cfg.exp.testLog = testLog;
    
	return console=merge(cfg.exp, log);
};