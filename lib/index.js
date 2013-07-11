'use strict';

var parser = require('./parser')
;

module.exports.parse = function parse(options, callback) {
	try {
		var options = options || {}
		, ticket = options.ticket
		, verifier = options.verifier
		, claimsAuth = options.claimsAuth || {}
		;
		if (!ticket) throw new Error('claims error -- no claims ticket');
		if (!verifier) throw new Error('claims error -- no verifier supplied');
		var parsed = parser.decode(ticket, verifier, claimsAuth);
		return callback && callback(null, parsed);
	}	catch (err) {
		return callback && callback(err);
	}
};