'use strict';

var keys = require('./keys')
;

function isConfigured() {
	return keys.isConfigured;
}

function $init($config) {
	if ('undefined' !== typeof $config && !isConfigured()) {
		keys($config);
	}
}

Object.defineProperties($init, {
	
	isConfigured: {
		get: isConfigured,
		enumerable: true
	},

	has: {
		value: keys.has,
		enumerable: true
	},

	get: {
		value: keys.get,
		enumerable: true
	}
});

module.exports = $init;