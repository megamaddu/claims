'use strict';

var claims = require('./lib')
, util = require('util')
, extend = util._extend
, _options = {}
;

module.exports = function $init($claimsOptions, callback, _) {
	var options;
	if ('string' === typeof $claimsOptions) {
		var ticket = $claimsOptions;
		$claimsOptions = callback;
		callback = _;
		options = extend({}, _options, { ticket: $claimsOptions });
		return claims.parse(options, callback);
	}
	options = extend({}, _options, $claimsOptions || {});
	return function (req, res, next) {
		var headerKey = options.headerKey || 'claims-ticket'
		;
		if (req.claims) {
			return next();
		}
		var ticket = req.headers[headerKey];
		return claims.parse(extend({}, options, { ticket: ticket }), function (err, parsed) {
			if (err) {
				throw err;
			}
			req.claims = parsed;
			next();
		});
	};
};