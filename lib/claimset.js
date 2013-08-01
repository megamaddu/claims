'use strict';

var opex = require('opex')
;

var defaults = {
		id: 0
	,	claims: {}
	, name: undefined
	, provider: undefined
	, signature: undefined
}
;

function Claimset(options) {
	var args = opex(defaults, options)
	, id = args.id
	, claims = args.claims
	, name = args.name
	, provider = args.provider
	, signature = args.signature
	;
	Object.defineProperties(this, {
		id: { enumerable: true, value: id },
		claims: { enumerable: true, value: claims },
		name: { enumerable: true, value: name },
		provider: { enumerable: true, value: provider },
		signature: { value: signature }
	});
}

module.exports = Claimset;