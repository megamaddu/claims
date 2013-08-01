'use strict';

var expect = require('expect.js')
;

function expectToBe(val) {
	return function(err, res) {
		ok(err, res);
		expect(res).to.be(val);
	}
}

function ok(err, res) {
	expect(err).to.not.be.ok();
}

function expectErr(err, res) {
	expect(err).to.be.ok();
}

function expectErrECONNREFUSED(err, res) {
	expect(err.code).to.be('ECONNREFUSED');
}

module.exports.expectToBe = expectToBe;
module.exports.ok = ok;
module.exports.expectErr = expectErr;
module.exports.expectErrECONNREFUSED = expectErrECONNREFUSED;
module.exports.encryptionConfig    = require('../examples/encryption/config.json');
module.exports.httpSignatureConfig = require('../node_modules/webflow/examples/trusted_client/trusted_client_config.json');
module.exports.ticket              = require('../examples/ticket');