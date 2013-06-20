var signer = require('./signer')
, verifier = require('./verifier')
, claim = require('./claim')
;

function isConfigured() {
	return signer.isConfigured
		&& verifier.isConfigured
		;
}

function $init($config) {
	if (typeof $config !== 'undefined' && !isConfigured()) {
		signer($config);
		verifier($config);
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

	claim: {
		value: claim,
		enumerable: true
	},

	isConfigured: {
		get: isConfigured,
		enumerable: true
	}

});

module.exports = $init;