var prefabLOG = require('./prefabLOG')();
console.log("CUSTOM LOGGER:");
prefabLOG.testLog();
console.log("DEFAULT CONSOLE LOGGER:");
prefabLOG.testLog(console);