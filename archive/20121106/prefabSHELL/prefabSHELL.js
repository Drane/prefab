/*!
 * prefabSHELL - Module Name
 * Copyright (C) 2012-2013 Jochen Szostek
 * MIT Licensed
 */

/**
 * A private namespace to set things up against the global object.
 */
require('shelljs/global');

/**
 * Clear the console.
 */
function _clear(){
	if (exec('clear').code !== 0) {
		echo('Error: Clear failed');
		exit(1);
	}
}
exports.clear = _clear;
/**
 * Run node.
 */
function _node(){
//	console.log("command: node "+[].slice.call(arguments, 0));
	
	if (exec('node '+[].slice.call(arguments, 0)).code !== 0) {
		echo('Error: Node command failed');
		exit(1);
	}
}
exports.node = _node;