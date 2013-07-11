'use strict';

var util = require('util')
, ticket = require('./ticket')
, verify = require('./dummy-encryption').verify
, claims = require('..')({ verifier: verify, claisAuth: { host: 'localhost', port: 8000 } })
;

claims(ticket.string, function (err, res) {
	if (err) throw err;
	console.log(util.inspect(err || res, false, 99));
	debugger;
	var x = res.verified;
	var y = res.isValid;
	debugger;
});