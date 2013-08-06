'use strict';

var util = require('util')
, extend = util._extend
, dbc = require('dbc.js')
, webflow = require('webflow')
, TrustedClient = webflow.TrustedClient
;

function ClaimsClient(options) {
	ClaimsClient.super_.call(this, options);
}
util.inherits(ClaimsClient, TrustedClient);

Object.defineProperties(ClaimsClient.prototype, {

	contributeOptions: {
		enumerable: true,
		value: function(req) {
			var opt = req.options || {};
			if ('undefined' !== typeof this.super_ && 'function' === typeof this.super_.contributeOptions) {
				extend(opt, this.super_.contributeOptions(req));
			}
			if (req.ticket) {
				if (!opt.headers) opt.headers = {};
				opt.headers['claims-ticket'] = req.ticket;
			}
			return opt;
		}
	}

});

Object.defineProperties(ClaimsClient, {
	create: {
		enumerable: true,
		value: function(options) {
			return new ClaimsClient(options);
		}
	}
});
module.exports = ClaimsClient;