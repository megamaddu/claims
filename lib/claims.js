'use strict';

var dbc = require('dbc.js')
, extend = require('extend')
;

var defaults = {
	claimsets: []
, expiration: new Date(null)
, signature: undefined
, encoded: undefined
, verified: false 
}
;

function Claims(options) {
	var args = extend({}, defaults, options), claimsets = args.claimsets, expiration = args.expiration, signature = args.signature, encoded = args.encoded, verified = args.verified;
	claimsets = claimsets instanceof Array ? claimsets : [claimsets];

	// dbc([claimsets.length])

	Object.defineProperty(this, 'claimsets', { enumerable: true, value: claimsets });
	Object.defineProperty(this, 'expiration', { enumerable: true, value: expiration });
	Object.defineProperty(this, 'signature', { enumerable: true, value: signature });
	Object.defineProperty(this, 'encoded', { enumerable: true, value: encoded });
	Object.defineProperty(this, 'verified', { enumerable: true, value: verified });
}

Object.defineProperties(Claims.prototype, {
	toJson: {
		value: function() {
			return JSON.stringify(this);
		},
		enumerable: true
	}
});

module.exports.Claims = Claims