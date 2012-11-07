/*!
 * prefabSHELL - Module Name
 * Copyright (C) 2012-2013 Jochen Szostek
 * MIT Licensed
 */

/**
 * A private namespace to set things up against the global object.
 */
//require('prefabHELPER/global');

/**
 * Globalize the given library.
 */
function _globalize(lib, globalArgs){
	globalArgs = globalArgs||true;
	
	for (cmd in lib){
		console.log("debug","_globalizing cmd",cmd);
		global[cmd] = prefabHELPER[cmd];
	}

	globalArgs&&(global.args = process.argv.slice(2));
}
exports.globalize = _globalize;

/**
 * should convert arguments object to orginal arguments (array in case of
 * multiple)
 */
function _argArray(){
	var result = [].slice.call([].slice.call(arguments, 0), 0);
	if(result.length===1){
		return result[0]
	}
	return result;
}
exports.argArray = _argArray;