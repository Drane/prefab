var prefab = require('../prefab')();
var prefabMODULE = require("../prefabMODULE")({
	pkg: require('./package.json'),
});

setTimeout(function () {
  console.log('sending out module');
  
}, 1000)
