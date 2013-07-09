'use strict';

var parser = require('./parser')
;

module.exports.parse = function parse(options, callback) {
	try {
		var options = options || {}
		, ticket = options.ticket
		, verifier = options.verifier
		, resolver = options.resolver || (function() { throw new Error('claims error -- no resolver configured'); })
		;
		if (!ticket) throw new Error('claims error -- no claims ticket');
		if (!verifier) throw new Error('claims error -- no verifier supplied');
		if (!resolver) throw new Error('claims error -- no resolver configured');
		var parsed = parser.decode(ticket, verifier, resolver)
		;
		return callback && callback(null, parsed);
	}	catch (err) {
		return callback && callback(err);
	}
};