'use strict';

var signer = require('./signer')
, verifier = require('./verifier')
, keys = require('./keys')
;

function isConfigured() {
	return signer.isConfigured && verifier.isConfigured && keys.isConfigured;
}

function $init($claims_encryption_config) {
	if (!!$claims_encryption_config && !isConfigured()) {
		keys($claims_encryption_config);
		signer($claims_encryption_config);
		verifier($claims_encryption_config);
	}
};

Object.defineProperties($init, {

	isConfigured: {
		enumerable: true,
		get: isConfigured
	},

	signer: {
		enumerable: true,
		value: signer
	},

	verifier: {
		enumerable: true,
		value: verifier
	},

	keys: {
		enumerable: true,
		value: keys
	}
});

module.exports = $init;