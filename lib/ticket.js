'use strict';

var __isConfigured = false;

function isConfigured() {
	// TODO: return true if configured; otherwise false.
	return __isConfigured;
}

function $init($config) {
	if (typeof $config !== 'undefined' && !isConfigured()) {
		// TODO: perform any required configuration logic.

		__isConfigured = true;
	}
}


Object.defineProperties($init, {

	isConfigured: {
		get: isConfigured,
		enumerable: true
	}

	// TODO: export any objects by attaching them here.

});

module.exports = $init;
