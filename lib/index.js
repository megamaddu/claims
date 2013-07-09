'use strict';

var parser = require('./parser')
;

module.exports.parse = function parse(options, callback) {
	try {
		var parsed = {};
		// parse
		return callback && callback(undefined, parsed);
	}	catch {
		return callback && callback(new Error('parser error'));
	}
};