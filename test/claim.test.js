'use strict';

var expect = require('expect.js')
, Claim = require('../lib/claim').Claim;

describe('A Claim should', function() {
	var id = 1
	, kind = 'i'
	, name = 'realm'
	, value = 'xyz'
	, claim = new Claim(id, kind, name, value)
	;
	it('build and properly return set values', function() {
		expect(claim.id).to.be(id);
		expect(claim.kind).to.be(kind);
		expect(claim.name).to.be(name);
		expect(claim.value).to.be(value);
	});
	it('return json from toJson', function() {
		var expectedResult = JSON.stringify({
			id: id,
			kind: kind,
			name: name,
			value: value
		});
		expect(claim.toJson()).to.be(expectedResult);
	});
});