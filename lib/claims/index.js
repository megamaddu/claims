'use strict';

var parser = require('./parser')
;

function isConfigured() {
	return parser.isConfigured;
}

function $init($config, verifier) {
	if ('undefined' !== typeof $config && !isConfigured()) {
		parser($config, verifier);
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