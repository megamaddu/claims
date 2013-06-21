'use strict';

var claims = require('..')
, path = require('path')
// this sample requires that development dependencies are present
, config = require('nconf')
, expect = require('expect.js')
;

// load the config from a file...
config.file(path.resolve('./test/test_config.json'));
claims(config);

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

var claims = claims.parse(ticketStr, 'global');
expect(claims).to.be.ok();
expect(claims.version).to.be(version);
expect(claims.expiration.getTime()).to.be(new Date(timestamp).getTime());
expect(claims.signature).to.be(signature);
expect(claims.encoded).to.be(ticketStr);
expect(claims.verified).to.be(true);
