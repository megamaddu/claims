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
				key: httpSignatureConfig.keys.trustedClientExampleKey.priv,
				keyId: 'trustedClientExampleKeyId'
			}
		}
	})
;

claims(ticket.string, function (err, claims) {
	if (err) throw err;
	
	describe('claims logic', function() {

		describe('when `has` is called', function() {

			it('it returns true when all the roles exist', function() {
				claims.has(0x0, 0x0f, expect(true));
				claims.has(0x0, 0x02, expect(true));
				claims.has('0.f', expect(true));
				claims.has('0.2', expect(true));
			});

			it('it returns false when none of the roles exist', function() {
				claims.has(0xe, 0x02, expect(false));
				claims.has(0xe, 0x01, expect(false));
				claims.has('e.2', expect(false));
				claims.has('e.1', expect(false));
			});

			it('it returns false when one of the roles does not exist', function() {
				claims.has(0x0, 0x1f, expect(false));
				claims.has(0xe, 0x09, expect(false));
				claims.has('0.1f', expect(false));
				claims.has('e.9', expect(false));
			});
		});

		describe('when `get` is called with full-claim value reference', function() {

			it('it returns a claim value when it exists', function() {
				claims.get('0.2', expect('XY'));
			});

			it('it throws when the claim value does not exist', function() {
				claims.get.bind(claims, 'f.1', expectErr);
			});
		});

		describe('when `get` is called with claim id and claim id', function() {

			it('it returns a claim value when it exists', function() {
				claims.get(0, 2, expect('XY'));
				claims.get('0', 2, expect('XY'));
				claims.get(0, '2', expect('XY'));
				claims.get('0', '2', expect('XY'));
			});

			it('it throws when the claim value does not exist', function() {
				// will throw until a claims authority service has been set up
				claims.get(0xf, 1, expectErrECONNREFUSED);
				claims.get('f', 1, expectErrECONNREFUSED);
				claims.get(0xf, '1', expectErrECONNREFUSED);
				claims.get('0xf', '1', expectErrECONNREFUSED);
			});
		});

		describe('when `resolve` is called with claim id and claim id', function() {

			it('it throws when the claim value does not exist', function() {
				// will throw until a claims authority service has been set up
				claims.resolve(0xf, 1, expectErrECONNREFUSED);
				claims.resolve('f', 1, expectErrECONNREFUSED);
				claims.resolve(0xf, '1', expectErrECONNREFUSED);
				claims.resolve('0xf', '1', expectErrECONNREFUSED);
			});

		});
	});
});