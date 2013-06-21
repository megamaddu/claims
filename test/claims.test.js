'use strict';

var helper = require('./claims_setup.helper')
, parse = helper.claims.parse
, keyName = helper.keyName
, expect = require('expect.js')
;

var preamble = 'mialc'
, version = '1'
, claimset = '0.0f,e.08;0-01.TlM=-02.WFk=-08:MTIzNDU='
, timestamp = '2013-06-30T18:38:36.480Z'
, signature = 'RcoumNDODR4VCpD8SvB8HSGZ0f49+pgyl7k+UqOMTV4PjgFDJVxIAKQbvDc+1xBKEWJgiIrEGnj9nfhQhGLHfUdwSHHPh9qcczNvZeUAxggj1ngUMyMCtDzS745/lqvt9yBkbpwspftd8i1vlBpfQR/n0G0nsGNixn1MSK4JnfBn254FAT2W7DsYBJ9JdO7lkQsFRKw7DTVFsRtMQ7yvUkImX7g0cKkE7ae4GKDoGhcHHdEz9Z6N8Zpn/Jab/g0JabO6qquHBhTDonwkM5cjrDmgc0Q/9splehetpH5xpNNYXueC+jSJo4ciPt28B+72ST16Q3qOx34flLg1tSrVNQ=='
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
	describe('when `hasRole` is called', function() {
		it('', function() {
			
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
