var prefab = require('../../prefab')();
var prefabMODULE = require("../../prefabMODULE")({
	pkg: require('./package.json'),
});

setInterval(function () {
	console.info('sending out module');
	prefabMODULE.send("yo");
}, 1000);