'use strict';

var expect = require('expect.js')
, parser = require('../').parser
;
describe('claims parser', function() {
	describe('when `decode` is passed a valid claims token', function() {
		var preamble = 'mialc'
		, version = '1'
		, claimset = '0.0f,e.08;0-01.TlM=-02.WFk=-08:MTIzNDU='
		, timestamp = '2013-06-30T18:38:36.480Z'
		, signature = 'MC4wZixlLjA4OzAtMDEuVGxNPS0wMi5XRms9LTA4Ok1USXpORFU9OzIwMTMtMDYtMzBUMTg6Mzg6MzYuNDgwWg=='
		, ticketStr = preamble
			.concat(version)
			.concat('#')
			.concat(claimset)
			.concat(';')
			.concat(timestamp)
			.concat('|')
			.concat(signature)
		;

		it('it correctly parses values from a claims ticket', function() {
			var claims = parser.decode(ticketStr);
			expect(claims).to.be.ok();
			expect(claims.version).to.be(version);
			expect(claims.expiration).to.be(new Date(timestamp));
			expect(claims.signature).to.be(signature);
			expect(claims.encoded).to.be(ticketStr);
			expect(claims.verified).to.be(true);
		});
	});
});