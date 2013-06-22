'use strict';

var helper = require('./claims_setup.helper')
, claims = helper.claims
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

describe('claims parser', function() {
	describe('when `decode` is passed a valid claims token', function() {
		it('it correctly parses values from a claims ticket', function() {
			var c = claims.parse(ticketStr, keyName);
			expect(c).to.be.ok();
			expect(c.version).to.be(version);
			expect(new Date(c.expiration).getTime()).to.be(new Date(timestamp).getTime());
			expect(c.signature).to.be(signature);
			expect(c.encoded).to.be(ticketStr);
			expect(c.verified).to.be(true);
		});
	});
});