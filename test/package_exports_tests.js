var claims = require('..')
, expect = require('expect.js')
;

describe('when the `claims` module is imported', function() {

	it('it exports #signer', function() {
		expect(claims).to.have.property('signer');
	});

	it('it exports #verifier', function() {
		expect(claims).to.have.property('verifier');
	});

	it('it exports #claim', function() {
		expect(claims).to.have.property('claim');
	});

});
