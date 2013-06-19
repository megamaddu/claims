'use strict';

var fs   = require('fs')
, dbc    = require('dbc.js')
, extend = require('extend')
, crypto = require('crypto');

var __pems = {};

function configure(config) {
	dbc([typeof config === 'object'], "config must be an object.");
	var all = config.get('auth:signatures');
	if (all) {
		var data = {};
		var keys = Object.keys(all), i;
		for(i = 0; i < keys.length; i++) {
			var it = all[keys[i]];
			var rec = { algorithm: it.algorithm || 'RSA-SHA1' };
			if (it.pubkey) {
				rec.pubkey = it.pubkey;
			}
			if (it.pubkeyfile) {
				rec.pubkey = fs.readFileSync(it.pubkeyfile);
			}
			if (it.privkey) {
				rec.privkey = it.privkey;
			}
			if (it.privkeyfile) {
				rec.privkey = fs.readFileSync(it.privkeyfile);
			}
			data[keys[i]] = rec;
		}
		extend(__pems, data);
	}
	return module.exports;
}

function Signer(name) {
	dbc([typeof name === 'string', name.length], "name must be a non-empty string.");
	if (!__pems[name]) {
		throw new Error('Signature not configured: '.concat(name));
	}
	Object.defineProperty(this, 'name', { value: name; });
}

Object.defineProperties(Signer.prototype, {
	sign: {
		value: function(data) {
			var signer = crypto.createSign(__pems[this.name].algorithm);
			signer.update(data);
			return signer.sign(__pems[this.name].privkey, 'base64');
		},
		enumerable: true
	}
})

function Verifier(name) {
	dbc([typeof name === 'string', name.length], "name must be a non-empty string.");
	if (!__pems[name]) {
		throw new Error('Signature not configured: '.concat(name));
	}
	Object.defineProperty(this, 'name', { value: name; });
}

Object.defineProperties(Verifier.prototype, {
	verify: {
		value: function (data, signature) {
			var verifier = crypto.createVerify(__pems[this.name].algorithm);
			verifier.update(data);
			return verifier.verify(__pems[this.name].pubkey, signature, 'base64');
		},
		enumerable: true
	}
});

module.exports.configure = configure;
module.exports.Signer = Signer;
module.exports.Verifier = Verifier;
