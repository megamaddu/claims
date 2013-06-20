var claims = require('..')
, expect = require('expect.js')
;

describe('claims', function() {

	describe('when the `claims` module is imported', function() {

		it('it exports #signer', function() {
			expect(claims).to.have.property('signer');
		});

		it('it exports #ticket', function() {
			expect(claims).to.have.property('ticket');
		});

		it('#isConfigured is false before being configured', function() {
			expect(claims).to.have.property('isConfigured');
			expect(claims.isConfigured).to.be(false);
		});
	})
})