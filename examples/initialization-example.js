var claims = require('..')
, path = require('path')
// this sample requires that development dependencies are present
, config = require('nconf')
, expect = require('expect.js')
;

// load the config from a file...
config.file(path.resolve('./test/test_config.json'));

expect(claims.isConfigured).to.be(false);

claims(config);

expect(claims.isConfigured).to.be(true);

var signer = claims.signer.create('global')
, verifier = claims.verifier.create('global')
, data = "this is some signed data"
;

var signature = signer.sign(data);

expect(verifier.verify(data, signature)).to.be(true);