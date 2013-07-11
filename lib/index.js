'use strict';

var parser = require('./parser')
;

function proxy(fn, options, callback) {
	var options = options || {}
	, ticket = options.ticket
	, verifier = options.verifier
	, claimsAuth = options.claimsAuth || {}
	;
	if (!ticket) throw new Error('claims error -- no claims ticket');
	if (!verifier) throw new Error('claims error -- no verifier supplied');
	try {
		var parsed = fn(ticket, verifier, claimsAuth);
	}	catch (err) {
		return callback && callback(err);
	}
	return callback && callback(null, parsed);
}

Object.defineProperties(module.exports, {

	parse: {
		enumerable: true,
		value: function parse(options, callback) {
			return proxy(parser.decode, options, callback);
		}
	},

	from: {
		enumerable: true,
		value: function from(options, callback) {
			return proxy(parser.from, options, callback);
		}
	}
});