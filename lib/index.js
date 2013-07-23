'use strict';

var parser = require('./parser')
, crypto = require('./encryption')
, dbc = require('dbc.js')
, ClaimsClient = require('./claims_client')
;

function proxy(fn, options, callback) {
	var options = options || {}
	, ticket = options.ticket
	, encryption = options.encryption
	, claimsAuth = options.claimsAuth || {}
	;
	dbc(!!ticket, 'claims error -- no claims ticket');
	dbc(!!encryption, 'claims error -- no encryption settings supplied');
	try {
		crypto(encryption);
		var keyName = encryption.signature.default || 'global'
		, verifier = crypto.verifier.create(keyName)
		, verify = verifier.verify.bind(verifier)
		, parsed = fn(ticket, verify, claimsAuth)
		;
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
	},

	ClaimsClient: { enumerable: true, value: ClaimsClient }
});