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

var claims = parse(ticketStr, keyName);

describe('claims logic', function() {
	describe('when `hasAllRoles` is called', function() {
		it('it returns true when all the roles exists', function() {
			expect(claims.hasAllRoles(0x0, 0x0f)).to.be(true);
			expect(claims.hasAllRoles(0x0, 0x02)).to.be(true);
		});
		it('it returns false when none of the roles exist', function() {
			expect(claims.hasAllRoles(0xe, 0x02)).to.be(false);
			expect(claims.hasAllRoles(0xe, 0x01)).to.be(false);
		});
		it('it returns false when one of the roles does not exist', function() {
			expect(claims.hasAllRoles(0x0, 0x1f)).to.be(false);
			expect(claims.hasAllRoles(0xe, 0x09)).to.be(false);
		});
	});
	describe('when `hasAnyRoles` is called', function() {
		it('it returns true when any of the roles exists', function() {
			expect(claims.hasAnyRoles(0x0, 0x0f)).to.be(true);
			expect(claims.hasAnyRoles(0x0, 0x02)).to.be(true);
		});
		it('it returns false when none of the roles exist', function() {
			expect(claims.hasAnyRoles(0xe, 0x02)).to.be(false);
			expect(claims.hasAnyRoles(0xe, 0x01)).to.be(false);
		});
		it('it returns true when at least one of the roles exists', function() {
			expect(claims.hasAnyRoles(0x0, 0x1f)).to.be(true);
			expect(claims.hasAnyRoles(0xe, 0x09)).to.be(true);
		});
	});
});

// describe('The Claims parser should', function() {
// 	var ticketStr = 'mialc1#0.0f,e.08;0-01.TlM=-02.WFk=-08:MTIzNDU=;2013-06-30T18:38:36.480Z|MC4wZixlLjA4OzAtMDEuVGxNPS0wMi5XRms9LTA4Ok1USXpORFU9OzIwMTMtMDYtMzBUMTg6Mzg6MzYuNDgwWg==';
// 	var claim = parser.decode(ticketStr);

// 	it('expiry call matches timestamp', function() {
// 		if (new Date() < new Date(claim._timestamp)) {
// 			expect(claim.expired()).to.not.be.ok();
// 		} else {
// 			expect(claim.expired()).to.be.ok();
// 		}
// 	});

// 	it('matches the original ticket when toString is called', function() {
// 		expect(claim.toString()).to.be(ticketStr);
// 	});


// 	// using private _hasRole to bypass hasRole's expiry check 
// 	//
// 	it('returns true for an existing role', function() {
// 		expect(claim._hasRole(0x0, 0x01)).to.be(true);
// 	});
// 	it('returns false for a non-existing role', function() {
// 		expect(claim._hasRole(0x0, 0x70)).to.be(false);
// 	});
// 	// not done yet
// 	// it('returns false when all roles in a claimset match', function() {
// 	// 	expect(claim._hasRole([ [0x0, 0xa], [0xe, 0x4] ])).to.be(true);
// 	// });
// });
