'use strict';

var opex = require('opex')
, dbc = require('dbc.js')
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
	, ticket: undefined
	, verifier: undefined
	, claimsAuth: undefined
}
;

function Claims(options) {
	var args = opex(defaults, options)
	, version = args.version
	, claimsets = args.claimsets
	, embeddedIdentities = args.embeddedIdentities
	, expiration = args.expiration
	, signature = args.signature
	, encoded = args.encoded
	, ticket = args.ticket
	, verifier = args.verifier
	, claimsAuth = args.claimsAuth
	;
	Object.defineProperties(this, {
		version: { enumerable: true, value: version },
		claimsets: { enumerable: true, value: claimsets },
		expiration: { enumerable: true, value: expiration },
		ticket: { enumerable: true, value: ticket },
		signature: { value: signature },
		encoded: { value: encoded },
		verifier: { value: verifier },
		claimsAuth: { value: claimsAuth },
		embeddedIdentities: { value: embeddedIdentities }
	});
}

function isValid() {
	return this.verified && (new Date() <= new Date(this.expiration));
}

function verified() {
	return this.verifier && this.verifier(this.encoded, this.signature);
}

function verifyClaim(csid, cid) {
	if (typeof cid === 'undefined') {
		dbc('string' === typeof csid && csid.indexOf('.') !== -1, 'claims error -- when cid is not supplied csid must be a string in the form `0.0`, where both digits are hex values');
		var parts = csid.split('.')
		, csid = parts[0]
		, cid = parts[1]
		;
	}
	if (typeof csid === 'string') {
		var csid = parseInt(csid, 16);
	}
	dbc('number' === typeof csid && csid !== NaN, 'claims error -- csid must be a valid hex number');
	if (typeof cid === 'string') {
		cid = parseInt(cid, 16);
	}
	dbc('number' === typeof cid && cid !== NaN, 'claims error -- cid must be a valid hex number');
	return { csid: csid.toString(16), cid: cid.toString(16) };
}

function has(csid, cid, cb) {
	if (arguments.length === 2) {
		cb = cid;
		cid = undefined;
	}
	if (!this.isValid) { return cb && cb(null, false); };
	var claim = verifyClaim(csid, cid)
	, claimset = this.claimsets[claim.csid]
	, b = 1
	;
	if (typeof claimset === 'undefined') {
		return cb && cb(null, false);
	}
	var pcid = parseInt(claim.cid, 16);
	while(b <= pcid) {
		if (b === (b & pcid) && typeof claimset.claims[b.toString(16)] === 'undefined') {
			return cb && cb(null, false);
		}
		b *= 2;
	}
	return cb && cb(null, true);
}

function get(csid, cid, cb) {
	if (arguments.length === 2) {
		cb = cid;
		cid = undefined;
	}
	try
	{
		var claim = verifyClaim(csid, cid)
		, claimset = this.claimsets[claim.csid]
		, c
		;
		if (claimset) {
			c = claimset.claims[claim.cid]
		}
	} catch (err) {
		return cb && cb(err);
	}
	return (c && c.value && c.value !== true) ? cb && cb(null, c.value) : this.resolve(claim.csid, claim.cid, cb);
}

function resolve(csid, cid, cb) {
	if (arguments.length === 2) {
		cb = cid;
		cid = undefined;
	}
	dbc('object' === typeof this.claimsAuth && 'function' === typeof this.claimsAuth.expand, 'claims error -- unable to resolve, no resolver defined');
	var claim = verifyClaim(csid, cid);
	return this.claimsAuth.expand(this, claim.csid, claim.cid, cb);
}

Object.defineProperties(Claims.prototype, {
	verified: {
		get: verified,
		enumerable: true
	},
	isValid: {
		get: isValid,
		enumerable: true
	},
	has: {
		value: has,
		enumerable: true
	},
	get: {
		value: get,
		enumerable: true
	},
	resolve: {
		value: resolve,
		enumerable: true
	}
});

module.exports = Claims