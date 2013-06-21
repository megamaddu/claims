'use strict';

var dbc = require('dbc.js')
, extend = require('extend')
, util = require('util')
;

var kinds = {
	unknown: 'u'
, role: 'r'
, fact: 'f'
, identity: 'i'
};

var defaults = {
	id: 0
, kind: kinds.unknown
, name: undefined
, value: undefined
};

function Claim(options) {
	var args = extend({}, defaults, options), id = args.id, kind = args.kind, name = args.name, value = args.value;

	Object.defineProperty(this, 'id', { enumerable: true, value: id });
	Object.defineProperty(this, 'kind', { enumerable: true, value: kind });
	Object.defineProperty(this, 'name', { enumerable: true, value: name });
	Object.defineProperty(this, 'value', { enumerable: true, value: value });
}

Object.defineProperties(Claim.prototype, {
	toJson: {
		value: function() {
			return JSON.stringify(this);
		},
		enumerable: true
	},
	kinds: {
		value: kinds
	}
});

module.exports = Claim;