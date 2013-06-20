'use strict';

var expect = require('expect.js')
, Claim = require('../lib/claim').Claim
, Claimset = require('../lib/claimset').Claimset
, Claims = require('../lib/claims').Claims
;

var claimOptions = {
		id: 1
	, kind: 'i'
	, name: 'realm'
	, value: 'xyz'
	}
, claim = new Claim(claimOptions)
;

describe('A Claim should', function() {
	it('build and properly return set values', function() {
		expect(claim.id).to.be(claimOptions.id);
		expect(claim.kind).to.be(claimOptions.kind);
		expect(claim.name).to.be(claimOptions.name);
		expect(claim.value).to.be(claimOptions.value);
	});
	it('return json from toJson', function() {
		var expectedResult = JSON.stringify(claimOptions);
		expect(claim.toJson()).to.be(expectedResult);
	});
});

var claimsetOptions = {
		id: 1
	, claims: [claim]
	, name: 'fdsa'
	, provider: 'asdf'
	}
, claimset = new Claimset(claimsetOptions);
;

describe('A Claimset should', function() {
	it('build and properly return set values', function() {
		expect(claimset.id).to.be(claimsetOptions.id);
		expect(claimset.claims).to.be(claimsetOptions.claims);
		expect(claimset.name).to.be(claimsetOptions.name);
		expect(claimset.provider).to.be(claimsetOptions.provider);
	});
	it('return json from tojson', function() {
		var expectedresult = JSON.stringify(claimsetOptions);
		expect(claimset.toJson()).to.be(expectedresult);
	});
});

var claimsOptions = {
		version: '1'
	,	claimsets: [claimset]
	, expiration: new Date()
	, signature: '1234'
	, encoded: 'asdf'
	, verified: true
	}
, claims = new Claims(claimsOptions);
;

describe('A Claims structure should', function() {
	it('build and properly return set values', function() {
		expect(claims.version).to.be(claimsOptions.version);
		expect(claims.claimsets).to.be(claimsOptions.claimsets);
		expect(claims.expiration).to.be(claimsOptions.expiration);
		expect(claims.signature).to.be(claimsOptions.signature);
		expect(claims.encoded).to.be(claimsOptions.encoded);
		expect(claims.verified).to.be(claimsOptions.verified);
	});
	it('return json from tojson', function() {
		var expectedresult = JSON.stringify(claimsOptions);
		expect(claims.toJson()).to.be(expectedresult);
	});
});