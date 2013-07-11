'use strict';

var mash = require('./util').mash
;

var defaults = {
		id: 0
	,	claims: {}
	, name: undefined
	, provider: undefined
}
;

function Claimset(options) {
	var args = mash(defaults, options)
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

module.exports = Claimset;