/*!
 * prefabSHELL - Module Name
 * Copyright (C) 2012-2013 Jochen Szostek
 * MIT Licensed
 */

/**
 * A private namespace to set things up against the global object.
 */
require('shelljs/global');
require('prefabHELPER/global');

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
	
	if (exec('node '+argArray(arguments)).code !== 0) {
		echo('Error: Node command failed');
		exit(1);
	}
}
exports.node = _node;

/**
 * Run npm.
 */
function _npm(){
//	console.log("command: node "+[].slice.call(arguments, 0));
	
	if (exec('npm '+toArgArray(arguments)).code !== 0) {
		echo('Error: Npm command failed');
		exit(1);
	}
}
exports.npm = _npm;

/**
 * Run node-supervisor.
 */
function _node-supervisor(){
//	console.log("command: node "+[].slice.call(arguments, 0));
	
	if (exec('node-supervisor '+[].slice.call(arguments, 0)).code !== 0) {
		echo('Error: Node-supervisor command failed');
		exit(1);
	}
}
exports.node-supervisor = _node-supervisor;