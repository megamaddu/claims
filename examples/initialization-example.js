var claims = require('..')
// this sample requires that development dependencies are present
, config = require('nconf')
, expect = require('expect.js')
;

// load the config from a file...
config.file('./sample-config.json');

expect(claims.isConfigured).to.be(false);

claims(config);

expect(claims.isConfigured).to.be(true);

