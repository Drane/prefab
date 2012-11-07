var assert = require("assert");
var _ = require("underscore");

var prefabHELPER = require('./prefabHELPER');
console.log((function(){ return _.toArray(arguments); })(1, 2, 3, 4));
console.log(prefabHELPER.argArray([1,2,3]));
console.log(prefabHELPER.argArray([1,2,3])==[1,2,3]);
console.log(prefabHELPER.argArray([1,2,3])===[1,2,3]);
//console.log(assert.equal(prefabHELPER.argArray([1,2,3]),[1,2,3]));
console.log(assert.equal(temp([1,2,3]),[1,2,3]));

function temp(){
	return _.toArray(arguments);
}