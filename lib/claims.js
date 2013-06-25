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

function verifyClaim(csid, cid) {
	if (typeof cid === 'undefined') {
		dbc([typeof csid === 'string', csid.indexOf('.') !== -1], 'when cid is not supplied csid must be a string in the form `0.00`, where both digits are hex values');
		var parts = csid.split('.')
		, csid = parts[0]
		, cid = parts[1]
		;
	}
	if (typeof csid === 'string') {
		csid = parseInt(csid, 16);
	}
	dbc([typeof csid === 'number', csid !== NaN], 'csid must be a valid hex number');
	if (typeof cid === 'string') {
		cid = parseInt(cid, 16);
	}
	dbc([typeof cid === 'number', cid !== NaN], 'cid must be a valid hex number');
	return { claimset: csid, claim: cid };
}

function get(csid, cid) {
	var claim = verifyClaim(csid, cid);
	var claimset = this.claimsets[claim.claimset];
	return (claimset) ? claimset.get(claim.claim) : undefined;
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