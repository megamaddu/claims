'use strict';

var expect = require('expect.js')
, keys = require('key-manager')('test')
;

function expectToBe(val, done) {
	return function(err, res) {
		ok()(err, res);
		expect(res).to.be(val);
		return done && done();
	}
}

function ok(done) {
	return function(err) {
		expect(err).to.not.be.ok();
		return done && done();
	}
}

function expectErr(done) {
	return function(err) {
		expect(err).to.be.ok();
		return done && done();
	}
}

function expectErrECONNREFUSED(done) {
	return function(err) {
		expect(err.code).to.be('ECONNREFUSED');
		return done && done();
	}
}

module.exports.expectToBe            = expectToBe;
module.exports.ok                    = ok;
module.exports.expectErr             = expectErr;
module.exports.expectErrECONNREFUSED = expectErrECONNREFUSED;
module.exports.httpSignatureConfig   = require('../node_modules/webflow/examples/trusted_client/trusted_client_config.json');
module.exports.ticket                = require('../examples/ticket');
module.exports.key                   = keys('test').priv;
module.exports.tcid                  = 'test';
module.exports.encryptionConfig      = {
	signature: {
		keys: {
			global: {
				pubkey: keys('claims-authority').pub
			}
		}
	}
};