'use strict';

var dbc = require('dbc.js')
, extend = require('extend')
;

var defaults = {
	version: undefined
, claimsets: {}
, expiration: new Date(null).toJSON()
, signature: undefined
, encoded: undefined
, verified: false
}
;

function Claims(options) {
	var args = extend({}, defaults, options)
	, version = args.version
	, claimsets = args.claimsets
	, expiration = args.expiration
	, signature = args.signature
	, encoded = args.encoded
	, verified = args.verified
	;

	Object.defineProperties(this, {
		version: { enumerable: true, value: version },
		claimsets: { enumerable: true, value: claimsets },
		expiration: { enumerable: true, value: expiration },
		signature: { enumerable: true, value: signature },
		encoded: { enumerable: true, value: encoded },
		verified: { enumerable: true, value: verified }
	});

}

function isValid() {
	return this.verified && (new Date() <= new Date(this.expiration));
}

function hasAnyRoles(claimsetId, roleFlags) {
	dbc([typeof claimsetId === 'number'], 'claimsetId must be a number');
	dbc([typeof roleFlags === 'number'], 'roleFlags must be a number');
	if (!this.isValid() || !this.claimsets) return false;

	var claimset = this.claimsets[claimsetId]
	, b = 0
	;

	while(++b <= roleFlags) {
		if (claimset.claims[b]) return true;
	}

	return false;
}

function hasAllRoles(claimsetId, roleFlags) {
	dbc([typeof claimsetId === 'number'], 'claimsetId must be a number');
	dbc([typeof roleFlags === 'number', roleFlags], 'roleFlags must be a number');
	if (!this.isValid() || !this.claimsets) return false;

	var claimset = this.claimsets[claimsetId]
	, b = 0
	;

	while(++b <= roleFlags) {
		if (!claimset.claims[b]) return false;
	}

	return true;
}

Object.defineProperties(Claims.prototype, {
	toJson: {
		value: function() {
			return JSON.stringify(this);
		},
		enumerable: true
	},
	isValid: {
		value: isValid,
		enumerable: true
	},
	hasAllRoles: {
		value: hasAllRoles,
		enumerable: true
	},
	hasAnyRoles: {
		value: hasAnyRoles,
		enumerable: true
	}
});

module.exports = Claims