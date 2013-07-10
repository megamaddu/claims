'use strict';

var mash = require('./util').mash
;

var kinds = {
		unknown: 'u'
	, role: 'r'
	, fact: 'f'
	, identity: 'i'
}
, defaults = {
		id: 0
	, kind: kinds.unknown
	, name: undefined
	, value: undefined
}
;
function Claim(options) {
	var args = mash({}, defaults, options)
	, id = args.id
	, kind = args.kind
	, name = args.name
	, value = args.value
	;

	Object.defineProperties(this, {
		id: { enumerable: true, value: id },
		kind: { enumerable: true, value: kind },
		name: { enumerable: true, value: name },
		value: { enumerable: true, value: value }
	});

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