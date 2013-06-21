'use strict';

var dbc = require('dbc.js')
, extend = require('extend')
;

var defaults = {
	id: 0
,	claims: {}
, name: undefined
, provider: undefined
};

function Claimset(options) {
	var args = extend({}, defaults, options), id = args.id, claims = args.claims, name = args.name, provider = args.provider;

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

module.exports = Claimset;