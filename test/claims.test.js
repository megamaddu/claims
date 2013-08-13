'use strict';

var helpers             = require('./test.helpers')
, expect                = helpers.expectToBe
, ok                    = helpers.ok
, expectErr             = helpers.expectErr
, expectErrECONNREFUSED = helpers.expectErrECONNREFUSED
, encryptionConfig      = helpers.encryptionConfig
, httpSignatureConfig   = helpers.httpSignatureConfig
, ticket                = helpers.ticket
, claims                = require('../')({
		encryption: encryptionConfig, 
		claimsAuth: {
			host: 'http://localhost:8000',
			httpSignature: {
				key: helpers.key,
				keyId: helpers.tcid
			}
		}
	})
;

claims(ticket.string, function (err, claims) {
	if (err) throw err;
	
	describe('claims logic', function() {

		describe('when `has` is called', function() {

			it('it `returns true` when all the roles exist', function(done) {
				claims.has('0.f', expect(true, done));
			});

			it('it `returns false` when none of the roles exist', function(done) {
				claims.has('e.2', expect(false, done));
			});

			it('it `returns false` when one of the roles does not exist', function(done) {
				claims.has('0.1f', expect(false, done));
			});
		});

		describe('when `get` is called with full-claim value reference', function() {

			it('it returns a claim `value` when it exists', function(done) {
				claims.get('0.2', expect('XY', done));
			});

			it('it `returns undefined` when the claim `rule` does not exist', function(done) {
				claims.get('f.1', expect(undefined, done));
			});

			it('it `throws` when the claim `value` does not exist and no `resolver` is available', function(done) {
				claims.get('12.2', expectErrECONNREFUSED(done));
			});
		});

		describe('when `resolve` is called', function() {

			it('it `throws` when the claim `value` does not exist and no `resolver` is available', function(done) {
				// will throw until a claims authority service has been set up
				claims.resolve('f.1', expectErrECONNREFUSED(done));
			});

		});
	});
});