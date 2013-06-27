'use strict';

var parser = require('./parser')
;

function isConfigured() {
	return parser.isConfigured;
}

function $init($config, verifier, resolver) {
	if ('undefined' !== typeof $config && !isConfigured()) {
		parser($config, verifier, resolver);
	}
}

Object.defineProperties($init, {

	parse: {
		value: parser.decode,
		enumerable: true
	},

	from: {
		value: parser.from,
		enumerable: true
	},

	isConfigured: {
		get: isConfigured,
		enumerable: true
	}

});

module.exports = $init;