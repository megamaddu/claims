'use strict';

var expect = require('expect.js')
, verify = require('../examples/dummy-encryption').verify
, ticket = require('../examples/ticket')
, claims = require('../')({ verifier: verify, claisAuth: { host: 'localhost', port: 8000 } })
;

claims(ticket.string, function (err, claims) {
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

			it('it returns undefined when the claim value does not exist', function() {
				expect(claims.get('f.1')).to.be(undefined);
			});
		});

		describe('when `get` is called with claim id and claim id', function() {

			it('it returns a claim value when it exists', function() {
				expect(claims.get(0, 2)).to.be('XY');
				expect(claims.get('0', 2)).to.be('XY');
				expect(claims.get(0, '2')).to.be('XY');
				expect(claims.get('0', '2')).to.be('XY');
			});

			it('it returns undefined when the claim value does not exist', function() {
				expect(claims.get(0xf, 1)).to.be(undefined);
				expect(claims.get('f', 1)).to.be(undefined);
				expect(claims.get(0xf, '1')).to.be(undefined);
				expect(claims.get('0xf', '1')).to.be(undefined);
			});
		});

		// describe('when `get` is called with claim id and claim id and resolve is set', function() {

		// 	it('it raeturns a claim value when it is not an embedded value but can be resolved', function() {
		// 		// resolver not written yet
		// 	});

		// 	it('it returns undefined when the claim value is not embedded and claims has no resolver', function() {
		// 		// resolver not written yet	
		// 	});
		// });

		describe('when `resolve` is called with claim id and claim id', function() {

			// it('it returns a claim value when it exists and can be resolved', function() {
			// 	// resolver not written yet
			// });

			it('it returns undefined when the claim value does not exist', function() {
				// not an accurate test until a resolver has been set up
				expect(claims.resolve(0xf, 1)).to.be(undefined);
				expect(claims.resolve('f', 1)).to.be(undefined);
				expect(claims.resolve(0xf, '1')).to.be(undefined);
				expect(claims.resolve('0xf', '1')).to.be(undefined);
			});

			it('it returns undefined when the claim has no resolver', function() {
				// assuming no resolver for now
				expect(claims.resolve('0', '8')).to.be(undefined);
				expect(claims.resolve('f', '1')).to.be(undefined);
				expect(claims.resolve('0', '1')).to.be(undefined);
				expect(claims.resolve('0xf', '1')).to.be(undefined);
			});
		});
	});
});