var prefab = require("./prefab")();
var prefabLOG = require("./prefabLOG")({prefab: prefab});

var log = prefab.log;
//console.dir(log);

function testLog(logger){
	var log = prefab.log;
	if(logger)log=logger;
	
	var skip=(log==console||log==prefab.log);
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
	
	console.log("\n");
}

//prefab.log.testLog();
//testLog();
testLog(console);
