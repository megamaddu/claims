'use strict';

var extend = require('util')._extend
;

module.exports.mash = function mash() {
	var res = {};
	for (var arg in arguments) {
		res = extend(res, arguments[arg] || {});
	}
	return res;
};