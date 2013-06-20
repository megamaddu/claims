'use strict';

var dbc = require('dbc.js')
, extend = require('extend');

function Claim(id, kind, name, value) {
	dbc([typeof id === 'number'], 'id must be a number');
	dbc([typeof kind === 'string', kind.length], 'kind must be a non-empty string');
	
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
	}
});

module.exports.Claim = Claim;