'use strict';

var helper = require('./claims_setup.helper')
, parse = helper.claims.parse
, keyName = helper.keyName
, expect = require('expect.js')
;

var preamble = 'mialc'
, version = '1'
, claimset = '0.0f,e.08;0-01.TlM=-02.WFk=-08:MTIzNDU='
, timestamp = '3000-06-30T18:38:36.480Z'
, signature = 't4LwkkKavN/73Btakwl6B0upFPeOhDfOYOjVMdh9Q8gYwlqJcCnlrLwU0gTQhlyuZpsMqxuOW4fxxZ1G9cOfm9urASiOpm5XcNYJo2Tr9Euko1+uwIzBrHIcCB30RASJXWry84mfGgy7EC2eL7M1vzxoRT+ESdIWR94TOmIqua66cRfeu434TgnGtikguTvAm5es0INvCBpBjsZPue4rWWcHLOzO40O9IUHKtMh0ouf4Xa27uU+KTf8Jkvk1M8yAGBLcyJX4l05exX08j08yJzW8KHCG91UY0HX8yGas54bwwPJU2JC4TAMo0KaWpHIcXML4Swbay201+KDtYzTscQ=='
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
