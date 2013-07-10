'use strict';

var util = require('util')
, ticket = require('./ticket')
, verify = require('./dummy-encryption').verify
, claims = require('..')({ verifier: verify, claisAuth: { host: 'localhost', port: 8000 } })
;

claims(ticket.string, function (err, res) {
	console.log(''.concat((err) ? 'err: ' : 'res: ', util.inspect(err || res, true, 99)));
});
