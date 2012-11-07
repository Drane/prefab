var prefabHELPER = require('..');
require('should');

describe('prefabHELPER', function(){
	describe('#argArray()', function(){
		it('should convert arguments object to orginal arguments (array in case of multiple)', function(){
			prefabHELPER.argArray('yo').should.equal('yo');
			prefabHELPER.argArray(1,2,3).should.eql([1,2,3]);
	    });
	});
});