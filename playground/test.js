
function testConsole() {
	console.log("test.testConsole");
}

function log() {

}

testConsole();
/*console.log = function(d) {
	process.stdout.write('custom '+d + '\n');
};*/
require('./testmod')();
testConsole();