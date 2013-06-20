'use strict';

var dbc = require('dbc.js');

function Claimset(id, claims, name, provider) {
	dbc([typeof id === 'number'], 'id must be a number');
	dbc([claims instanceof Array, claims.length], 'claims must be a non-empty Array');
	dbc([!name || (typeof name === 'string' && name.length)], 'name must be a non-empty string');
	dbc([!provider || (typeof provider === 'string' && provider.length)], 'provider must be a non-empty string');
	
	Object.defineProperty(this, 'id', { enumerable: true, value: id });
	Object.defineProperty(this, 'claims', { enumerable: true, value: claims });
	Object.defineProperty(this, 'name', { enumerable: true, value: name });
	Object.defineProperty(this, 'provider', { enumerable: true, value: provider });
}

Object.defineProperties(Claimset.prototype, {
	toJson: {
		value: function() {
			return JSON.stringify(this);
		}
	}
});

module.exports.Claimset = Claimset;