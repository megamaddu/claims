'use strict';

var claims = require('./lib')
, opex = require('opex')
, options = {}
;

module.exports = function $init($claimsOptions) {
	var options = $claimsOptions
	, res = function (req, res, next) {
		if ('string' === typeof req) {
			/**
			 * assume claims is being called explicitly -- req = ticket, res = callback
			 */
			return claims.parse(opex(options, { ticket: req }), 'function' === typeof res ? res : undefined);
		}
		/**
		 * assume connect middleware
		 */
		var header = options.header || 'claims-ticket'
		;
		if (req.claims) {
			return next();
		}
		var ticket = req.headers[header];
		return claims.parse(opex(options, { ticket: ticket }), function (err, parsed) {
			if (err) {
				throw err;
			}
			req.claims = parsed;
			next();
		});
	};
	/**
	 * support claims.from and claims.parse
	 */
	Object.defineProperties(res, {
		from: {
			enumerable: true,
			value: function from(claimsJson, callback) {
				return claims.from(opex(options, { ticket: claimsJson }), callback);
			}
		},
		parse: {
			enumerable: true,
			value: function parse(ticket, callback) {
				return claims.parse(opex(options, { ticket: ticket }), callback);
			}
		}
	});
	return res;
};