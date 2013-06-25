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
, claimset = undefined
, claim = undefined
;

describe('claims logic', function() {
	describe('when `has` is called', function() {
		it('it returns true when all the roles exists', function() {
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
	describe('when `get` is called', function() {
		it('it returns a claimset when it exists', function() {
			claimset = claims.get('0');
			var claimset2 = claims.get(0);
			expect(claimset2).to.be.ok();
			expect(claimset).to.be.ok();
			expect(claimset.id).to.be(0);
		});
		it('it throws when the claimset does not exist', function() {
			expect(function() { claims.get('f'); }).to.throwError();
		});
	});
});

describe('claimset logic', function() {
	it('when `get` is called', function() {
		it('it returns a claim/role when it exists', function() {
			claim = claimset.get('0');
			var claim2 = claimset.get(0);
			expect(claim2).to.be.ok();
			expect(claim).to.be.ok();
			expect(claim.id).to.be(0);
		});
		it('it throws when the claim/role does not exist', function() {
			expect(function() { claimset.get('fff'); }).to.throwError();
		});
	});
});