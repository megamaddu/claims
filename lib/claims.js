'use strict';

var dbc = require('dbc.js')
, extend = require('extend')
;

var embeddedIdentityClaimset = 0x0
, embeddedIdentityRoles = {
		realm: 0x02
	, tenant: 0x04
	, source: 0x08
	, synthId: 0x10
	, email: 0x20
}
, defaults = {
		version: undefined
	, claimsets: {}
	, embeddedIdentities: {}
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
	, embeddedIdentities = args.embeddedIdentities
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
		verified: { enumerable: true, value: verified },
		embeddedIdentities: { enumerable: false, value: embeddedIdentities }
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
	, b = 1
	;

	while(b <= roleFlags) {
		if (b === (b & roleFlags) && claimset.claims[b]) return true;
		b *= 2;
	}

	return false;
}

function hasAllRoles(claimsetId, roleFlags) {
	dbc([typeof claimsetId === 'number'], 'claimsetId must be a number');
	dbc([typeof roleFlags === 'number', roleFlags], 'roleFlags must be a number');
	if (!this.isValid() || !this.claimsets) return false;

	var claimset = this.claimsets[claimsetId]
	, b = 1
	;

	while(b <= roleFlags) {
		if (b === (b & roleFlags) && !claimset.claims[b]) return false;
		b *= 2;
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