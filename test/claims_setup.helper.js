'use strict';

// builds a configured claims object to simplify other tests

var claims = require('..')
, path = require('path')
// this sample requires that development dependencies are present
, config = require('nconf')
, expect = require('expect.js')
;

// load the config from a file...
config.file(path.resolve('./test/test_config.json'));
claims(config);

module.exports.claims = claims;
module.exports.keyName = 'global';