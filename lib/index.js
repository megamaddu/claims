'use strict';

var signer = require('./signer')
, verifier = require('./verifier')
, claims = require('./claims')
;

function isConfigured() {
	return signer.isConfigured
		&& verifier.isConfigured
		&& claims.isConfigured
		;
}

function $init($config) {
	if (typeof $config !== 'undefined' && !isConfigured()) {
		signer($config);
		verifier($config);
		claims($config, verifier);
	}
}

Object.defineProperties($init, {

	signer: {
		value: signer,
		enumerable: true
	},

	verifier: {
		value: verifier,
		enumerable: true
	},

	parse: {
		value: claims.parse,
		enumerable: true
	},

	from: {
		value: claims.from,
		enumerable: true
	},

	isConfigured: {
		get: isConfigured,
		enumerable: true
	}

});

module.exports = $init;