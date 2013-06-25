"use strict"

var dbc  = require('dbc.js')
, extend = require('extend')
, crypto = require('crypto')
, keys   = require('./keys')
;

function Verifier(name) {
	dbc([typeof name === 'string', name.length], "name must be a non-empty string.");
	if (!keys.has(name)) {
		throw new Error('Signature not configured: '.concat(name));
	}
	Object.defineProperty(this, 'name', { value: name });
}

Object.defineProperties(Verifier.prototype, {
	verify: {
		value: function(data, signature) {
			var key = keys.get(this.name)
			, verifier = crypto.createVerify(key.algorithm)
			;
			verifier.update(data);
			return verifier.verify(key.pubkey, signature, 'base64');
		},
		enumerable: true
	}
});

function isConfigured() {
	return keys.isConfigured;
}

function $init($config) {
	if (typeof $config !== 'undefined' && !isConfigured()) {
		keys($config);
	}
}

Object.defineProperties($init, {

	create: {
		value: function(name) {
			return new Verifier(name);
		},
		enumerable: true
	},

	Verifier: {
		value: Verifier,
		enumerable: true
	},

	isConfigured: {
		get: isConfigured,
		enumerable: true
	}

});

module.exports = $init;
