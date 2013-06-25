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

function has(claimsetId, roleFlags) {
	if (!this.isValid()) { return false };

	if (typeof roleFlags === 'undefined') {
		dbc([typeof claimsetId === 'string', claimsetId.indexOf('.') !== -1], 'when roleFlags is not supplied claimsetId must be a string in the form `0.00`, where both digits are hex values');
		var parts = claimsetId.split('.')
		, claimsetId = parts[0]
		, roleFlags = parts[1]
		;
	}

	if (typeof claimsetId === 'string') {
		claimsetId = parseInt(claimsetId, 16);
	}

	if (typeof roleFlags === 'string') {
		roleFlags = parseInt(roleFlags, 16);
	}

	dbc([
		typeof claimsetId === 'number'
	, claimsetId !== NaN
	, typeof roleFlags === 'number'
	, roleFlags !== NaN
	], 'invalid parameters: { claimsetId: '.concat(claimsetId).concat(', roleFlags:').concat(roleFlags).concat(' }'));

	var claimset = this.claimsets[claimsetId]
	, b = 1
	;

	if (typeof claimset === 'undefined') {
		return false;
	}

	while(b <= roleFlags) {
		if (b === (b & roleFlags) && typeof claimset.claims[b] === 'undefined') {
			return false;
		}

		b *= 2;
	}

	return true;
}

function get(claimsetId) {
	if (typeof claimsetId === 'string') {
		claimsetId = parseInt(claimsetId, 16);
	}

	dbc([typeof claimsetId === 'number', claimsetId !== NaN], 'claimsetId must be a valid hex number');
	var claimset = this.claimsets[claimsetId];
	dbc([typeof claimset !== 'undefined'], 'claimset does not exist');
	return claimset;
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
	has: {
		value: has,
		enumerable: true
	},
	get: {
		value: get,
		enumerable: true
	}
});

module.exports = Claims