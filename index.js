'use strict';

var claims = require('./lib')
, extend = require('extend')
, _options = {}
;

module.exports = function $init($claimsOptions, callback) {
	var options;
	if ('string' === typeof $claimsOptions) {
		options = extend({ ticket: $claimsOptions }, _options);
		return claims.parse(options, callback);
	}
	options = extend($claimsOptions || {}, _options);
	return function (req, res, next) {
		var headerKey = options.headerKey || 'x-claims-ticket'
		;
		if (req.claims) {
			return next();
		}
		var ticket = req.headers[headerKey];
		return claims.parse(extend({ ticket: ticket }, options }, function (err, parsed) {
			if (err) {
				throw err;
			}
			req.claims = parsed;
			next();
		});
	};
};