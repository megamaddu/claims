'use strict';

var util = require('util')
, extend = util._extend
, dbc = require('dbc.js')
, webflow = require('webflow')
, TrustedClient = webflow.TrustedClient
;

function ClaimsClient(options) {
	ClaimsClient.super_.call(this, options);
}
util.inherits(ClaimsClient, TrustedClient);

Object.defineProperties(ClaimsClient.prototype, {

	defaultHeaders: {
		enumerable: true,
		value: function(body, meta, $claims) {
			var headers = this.super_.defaultHeaders(body, meta)
			, ticket = $claims.ticket
			;
			headers['claims-ticket'] = ticket;
			return headers;
		}
	}

});

Object.defineProperties(ClaimsClient, {
	create: {
		enumerable: true,
		value: function(options) {
			return new ClaimsClient(options);
		}
	}
});
module.exports = ClaimsClient;