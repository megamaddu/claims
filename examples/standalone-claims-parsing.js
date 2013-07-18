'use strict';

var util = require('util')
, ticket = require('./ticket')
, encryption_config = require('./encryption/config.json')
, claims = require('..')({ encryption: encryption_config, claimsAuth: { host: 'localhost', port: 8000 } })
;

claims(ticket.string, function (err, res) {
	if (err) throw err;
	console.log('claims: '.concat(util.inspect(res, false, 99)));
	console.log('claims.verified: '.concat(res.verified));
	console.log('claims.isValid: '.concat(res.isValid));
});