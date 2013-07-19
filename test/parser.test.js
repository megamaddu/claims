'use strict';

var expect = require('expect.js')
, claimsJson = JSON.parse(require('./parser.test.data.js'))
, encryptionConfig = require('../examples/encryption/config.json')
, httpSignatureConfig = require('../node_modules/webflow/examples/trusted_client/trusted_client_config.json')
, ticket = require('../examples/ticket')
, claims = require('../')({
		encryption: encryptionConfig,
		claimsAuth: {
			host: 'http://localhost:8000',
			httpSignature: {
				key: httpSignatureConfig.keys.trustedClientExampleKey.priv,
				keyId: 'trustedClientExampleKeyId'
			}
		}
	})
;

describe('claims parser', function() {

	describe('when `decode` is passed a valid claims token', function() {

		it('it correctly parses values from a claims ticket', function() {
			claims.parse(ticket.string, function (err, claims) {
				if (err) throw err;
				expect(claims).to.be.ok();
				expect(claims.version).to.be(ticket.version);
				expect(new Date(claims.expiration).getTime()).to.be(new Date(ticket.timestamp).getTime());
				expect(claims.signature).to.be(ticket.signature);
				expect(claims.ticket).to.be(ticket.string);
				expect(claims.verified).to.be(true);
				expect(claims.isValid).to.be(true);
			});
		});
	});

	describe('when `from` is passed a valid claims structure', function() {

		it('it correctly builds claims objects from json objects', function() {
			claims.from(claimsJson, function (err, claims) {
				if (err) throw err;
				expect(claims).to.be.ok();
				expect(claims.version).to.be(ticket.version);
				expect(new Date(claims.expiration).getTime()).to.be(new Date(ticket.timestamp).getTime());
				expect(claims.signature).to.be(ticket.signature);
				expect(claims.ticket).to.be(ticket.string);
				expect(claims.verified).to.be(true);
				expect(claims.isValid).to.be(true);
			});
		});

		it('it correctly builds claims objects from a json string', function() {
			claims.from(JSON.stringify(claimsJson), function (err, claims) {
				if (err) throw err;
				expect(claims).to.be.ok();
				expect(claims.version).to.be(ticket.version);
				expect(new Date(claims.expiration).getTime()).to.be(new Date(ticket.timestamp).getTime());
				expect(claims.signature).to.be(ticket.signature);
				expect(claims.ticket).to.be(ticket.string);
				expect(claims.verified).to.be(true);
				expect(claims.isValid).to.be(true);
			});
		});
	});
});