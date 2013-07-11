'use strict';

var expect = require('expect.js')
, claimsJson = JSON.parse(require('./parser.test.data.js'))
, ticket = require('../examples/ticket')
, verify = require('../examples/dummy-encryption').verify
, claims = require('../')({ verifier: verify, claisAuth: { host: 'localhost', port: 8000 } })
;

describe('claims parser', function() {

	describe('when `decode` is passed a valid claims token', function() {

		it('it correctly parses values from a claims ticket', function() {
			claims.parse(ticket.string, function (err, claims) {
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