'use strict';

var fs   = require('fs')
, dbc    = require('dbc.js')
, path   = require('path')
, extend = require('extend')
;

var __pems = {}
, __isConfigured = false
;

function isConfigured() {
	return __isConfigured;
}

function $init($config) {
	if (typeof $config !== 'undefined' && !isConfigured()) {
		var all = $config.get('signature:keys');
		if (all) {
			var data = {};
			var keys = Object.keys(all)
			, len = keys.length
			, i = -1;
			while(++i < len) {
				var it = all[keys[i]];
				var rec = { algorithm: it.algorithm || 'RSA-SHA1' };
				if (it.pubkey) {
					rec.pubkey = it.pubkey;
				}
				if (it.pubkeyfile) {
					rec.pubkey = fs.readFileSync(path.resolve(it.pubkeyfile));
				}
				if (it.privkey) {
					rec.privkey = it.privkey;
				}
				if (it.privkeyfile) {
					rec.privkey = fs.readFileSync(path.resolve(it.privkeyfile));
				}
				data[keys[i]] = rec;
			}
			extend(__pems, data);
		}
		__isConfigured = true;
	}
}

Object.defineProperties($init, {

	has: {
		value: function(key) {
			return __pems.hasOwnProperty(key);
		}
	},

	get: {
		value: function(key) {
			return __pems[key];
		}
	},

	isConfigured: {
		get: isConfigured,
		enumerable: true
	}

});

module.exports = $init;
