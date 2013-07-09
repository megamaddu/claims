'use strict';

var claims = require('..')
, ticket = require('./ticket')
, util = require('util')
, verify = require('./dummy-encryption').verify
;

claims(ticket.string, { verifier: verify }, function (err, res) {
	console.log(''.concat((err) ? 'err: ' : 'res: ', util.inspect(err || res, true, 99)));
});
