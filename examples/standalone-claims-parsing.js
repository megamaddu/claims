'use strict';

var util = require('util')
, ticket = require('./ticket')
, verify = require('./dummy-encryption').verify
, claims = require('..')({ verifier: verify, claisAuth: { host: 'localhost', port: 8000 } })
;

claims(ticket.string, function (err, res) {
	if (err) throw err;
	console.log(util.inspect(err || res, true, 99));
});
