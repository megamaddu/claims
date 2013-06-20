'use strict';

var expect = require('expect.js')
, Claim = require('../lib/claim').Claim
, Claimset = require('../lib/claimset').Claimset;

describe('A Claimset should', function() {
	var claimId = 1
	, claimKind = 'i'
	, claimName = 'realm'
	, claimValue = 'xyz'
	, claim = new Claim(claimId, claimKind, claimName, claimValue)
	;
	var id = 1
	, claims = [claim]
	, name = 'fdsa'
	, provider = 'asdf'
	, claimset = new Claimset(id, claims, name, provider);
	;
	it('build and properly return set values', function() {
		expect(claimset.id).to.be(id);
		expect(claimset.claims).to.be(claims);
		expect(claimset.name).to.be(name);
		expect(claimset.provider).to.be(provider);
	});
	it('return json from tojson', function() {
		var expectedresult = JSON.stringify({
			id: id,
			claims: claims,
			name: name,
			provider: provider
		});
		expect(claimset.toJson()).to.be(expectedresult);
	});
});