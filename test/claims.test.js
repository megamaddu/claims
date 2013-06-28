'use strict';

var helper = require('./claims_setup.helper')
, parse = helper.claims.parse
, keyName = helper.keyName
, expect = require('expect.js')
;

var preamble = 'mialc'
, version = '1'
, claimset = '0.f,e.8;0.1:TlM=.2:WFk=.4:bnM=.8:cHdz.10:MTIzNDU=.20:GVzdEBlbWFpbC5jb20=,e.8:dGVzdFZhbHVl'
, timestamp = '3000-06-30T18:38:36.480Z'
, signature = 'L8i/v+4hVaBUQuuOIB+X689PGb+2U21BdWWpok7iim3je0je3hdZT4RyCcK7125igOs3FZzkigus9v5fqqR7fqoXp9VetVHbkrMkR6k5B2gGg6D2dMhqokkLQgGTyP6x/q5kxHz3b3YoAUoFyFLvbNZ4ke1YoGDejfRFGbSNBoPgXtrPDXhzczbvu8rNBSPHQDgnaQgvCVxcxtwvOtqWYUCaX1Mor5hwj3v/eGrmtKqc1q3i1OSZpBT7ELOxkdwQEFivWi8wUUl95D3Qg/XfN7O3RycjBbyWptI/ObMV3dCAdWaqG2Jr87qofA1C6ufVdnW4fjlW/7/G2E3Sz/XZ5g=='
, ticketStr = preamble
	.concat(version)
	.concat('#')
	.concat(claimset)
	.concat(';')
	.concat(timestamp)
	.concat('|')
	.concat(signature)
;

var claims = parse(ticketStr, keyName)
;

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