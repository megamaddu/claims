'use strict';

var expect = require('expect.js')
, encryptionConfig = require('../examples/encryption/config.json')
, httpSignatureConfig = require('../node_modules/webflow/examples/trusted_client/trusted_client_config.json')
, ticket = require('../examples/ticket')
, claims = require('../')({ 
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
				expect(claims.has(0x0, 0x0f)).to.be(true);
				expect(claims.has(0x0, 0x02)).to.be(true);
				expect(claims.has('0.0f')).to.be(true);
				expect(claims.has('0.02')).to.be(true);
			});

			it('it returns false when none of the roles exist', function() {
				expect(claims.has(0xe, 0x02)).to.be(false);
				expect(claims.has(0xe, 0x01)).to.be(false);
				expect(claims.has('e.2')).to.be(false);
				expect(claims.has('e.1')).to.be(false);
			});

			it('it returns false when one of the roles does not exist', function() {
				expect(claims.has(0x0, 0x1f)).to.be(false);
				expect(claims.has(0xe, 0x09)).to.be(false);
				expect(claims.has('0.1f')).to.be(false);
				expect(claims.has('e.9')).to.be(false);
			});
		});

		describe('when `get` is called with full-claim value reference', function() {

			it('it returns a claim value when it exists', function() {
				expect(claims.get('0.2')).to.be('XY');
			});

			it('it throws when the claim value does not exist', function() {
				expect(claims.get.bind(claims, 'f.1', noop)).to.throwError();
			});
		});

		describe('when `get` is called with claim id and claim id', function() {

			it('it returns a claim value when it exists', function() {
				expect(claims.get(0, 2, noop)).to.be('XY');
				expect(claims.get('0', 2, noop)).to.be('XY');
				expect(claims.get(0, '2', noop)).to.be('XY');
				expect(claims.get('0', '2', noop)).to.be('XY');
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

function noop(err, res) {
}

function expectErrECONNREFUSED(err, res) {
	expect(err.code).to.be('ECONNREFUSED');
}