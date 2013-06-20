'use strict';

var dbc = require('dbc.js')
, extend = require('extend')
;

var defaults = {
	id: 0
,	claims: []
, name: undefined
, provider: undefined
};

function Claimset(options) {
	var args = extend({}, defaults, options), id = args.id, claims = args.claims, name = args.name, provider = args.provider;
	claims = claims instanceof Array ? claims : [claims];
	// dbc([typeof id === 'number'], 'id must be a number');
	// dbc([claims.length, claims[0] instanceof Claim], 'claims must be a non-empty Array of Claim objects');
	// dbc([!name || (typeof name === 'string' && name.length)], 'name must be a non-empty string');
	// dbc([!provider || (typeof provider === 'string' && provider.length)], 'provider must be a non-empty string');
	
	Object.defineProperty(this, 'id', { enumerable: true, value: id });
	Object.defineProperty(this, 'claims', { enumerable: true, value: claims });
	Object.defineProperty(this, 'name', { enumerable: true, value: name });
	Object.defineProperty(this, 'provider', { enumerable: true, value: provider });
}

Object.defineProperties(Claimset.prototype, {
	toJson: {
		value: function() {
			return JSON.stringify(this);
		},
		enumerable: true
	}
});

module.exports.Claimset = Claimset;