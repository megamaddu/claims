'use strict';

var dbc = require('dbc.js')
, extend = require('extend')
;

var defaults = {
		id: 0
	,	claims: {}
	, name: undefined
	, provider: undefined
}
;

function Claimset(options) {
	var args = extend({}, defaults, options)
	, id = args.id
	, claims = args.claims
	, name = args.name
	, provider = args.provider
	;
	Object.defineProperties(this, {
		id: { enumerable: true, value: id },
		claims: { enumerable: true, value: claims },
		name: { enumerable: true, value: name },
		provider: { enumerable: true, value: provider }
	});
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