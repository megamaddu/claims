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

function get(roleFlag) {
	if (typeof roleFlag === 'string') {
		roleFlag = parseInt(roleFlag, 16);
	}

	dbc([typeof roleFlag === 'string', roleFlag !== NaN], 'roleFlag must be a valid hex number');
	role = this.claims[roleFlag];
	dbc([typeof role !== 'undefined'], 'role does not exist');
	return role;
}

Object.defineProperties(Claimset.prototype, {
	toJson: {
		value: function() {
			return JSON.stringify(this);
		},
		enumerable: true
	},
	get: {
		value: get,
		enumerable: true
	}
});

module.exports = Claimset;