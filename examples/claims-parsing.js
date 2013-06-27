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

debugger;
var claims = claims.parse(ticketStr, 'global');
expect(claims).to.be.ok();
expect(claims.version).to.be(version);
expect(new Date(claims.expiration).getTime()).to.be(new Date(timestamp).getTime());
expect(claims.signature).to.be(signature);
expect(claims.encoded).to.be(ticketStr);
expect(claims.verified).to.be(true);
