var signer = require('./signer')
, verifier = require('./verifier')
, ticket = require('./ticket')
;

function isConfigured() {
	return signer.isConfigured
		&& verifier.isConfigured
		&& ticket.isConfigured;
}

function $init($config) {
	if (typeof $config !== 'undefined' && !isConfigured()) {
		signer($config);
		verifier($config);
		ticket($config);
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

	ticket: {
		value: ticket,
		enumerable: true
	},

	isConfigured: {
		get: isConfigured,
		enumerable: true
	}

});

module.exports = $init;