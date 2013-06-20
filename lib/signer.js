"use strict"

var fs   = require('fs')
, dbc    = require('dbc.js')
, extend = require('extend')
, crypto = require('crypto')
, keys   = require('./keys')
;

function Signer(name) {
	dbc([typeof name === 'string', name.length], "name must be a non-empty string.");
	if (!keys.has(name)) {
		throw new Error('Signature not configured: '.concat(name));
	}
	Object.defineProperty(this, 'name', { value: name });
}

Object.defineProperties(Signer.prototype, {
	sign: {
		value: function(data) {
			var key = keys.get(this.name)
			, signer = crypto.createSign(key.algorithm)
			;
			signer.update(data);
			return signer.sign(key.privkey, 'base64');
		},
		enumerable: true
	}
})


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
		value: function (name) {
			return new Signer(name);
		},
		enumerable: true
	},

	Signer: {
		value: Signer,
		enumerable: true
	},

	isConfigured: {
		get: isConfigured,
		enumerable: true
	}

});

module.exports = $init;
