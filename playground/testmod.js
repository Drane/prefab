var testmod;

module.exports = exports = testmod = function testmod_module(opts) {
	console.log("in testmod");
	
	function testConsole() {
		console.log("msg: testmod.testConsole");
	}
	
	var cfg = {exp : {}};
	
	testConsole();
	console.log = function(d) {
		process.stdout.write('testmod overwritten console log-> '+d + '\n');
	};
	testConsole();
	
	
//	cfg.exp.console.log = console.log;
	return cfg.exp;
};