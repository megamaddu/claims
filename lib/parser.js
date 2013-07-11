'use strict';

var Claim = require('./claim')
,	Claimset = require('./claimset')
, Claims = require('./claims')
, verifier = require('./')
, jsonschema = require('jsonschema')
, schema = require('./schema.json')
;

var conf = {
	preamble: 'mialc' // String.fromCharCode(128)
, versionAndClaimAndImpersonatorSeperator: '#'
, claimAndSignatureSeperator: '|'
, sectionSeperator: ';'
, itemSeperator: ','
, detailSeperator: ':'
, claimsetSeparator: '.'
, claimIndex: 1
, impersonatorIndex: 2
, claimSectionsIndex: 0
, versionIndex: 0
, claimsetIndex: 0
, claimsetHeaderIndex: 0
, rulesIndex: 1
, detailsIndex: 1
, timestampIndex: 2
, signatureIndex: 1
, claimsetIdIndex: 0
, claimsetRulesIndex: 1
, claimsetDetailsIndex: 1
, detailsRuleIdIndex: 0
, detailsRuleIndex: 1
}
;

var knownIdentities = {
	'0': {
		'1': 'super'
	,	'2': 'commissioner'
	, '4': 'realm'
	, '8': 'tenant'
	, '16': 'source'
	, '32': 'uid'
	, '64': 'email'
	}
};

var __verifier, __claimsAuth;

function decode(ticket, verifier, claimsAuth) {
	if ('string' !== typeof ticket) throw new Error('parser error -- ticket must be a string');
	if ('function' !== typeof verifier) throw new Error('parser error -- verifier must be a function');

	if (ticket.slice(0, conf.preamble.length) !== conf.preamble) throw new Error('parser error -- preamble missing or corrupt');

	var versionAndClaimAndImpersonator = ticket.slice(conf.preamble.length).split(conf.versionAndClaimAndImpersonatorSeperator)
	, version = versionAndClaimAndImpersonator[conf.versionIndex]
	, claimAndSignatureBlock = versionAndClaimAndImpersonator[conf.claimIndex]
	, impersonator = versionAndClaimAndImpersonator[conf.impersonatorIndex]
	;

	if (typeof version === 'undefined') throw new Error('parser error -- version is required');
	if (typeof claimAndSignatureBlock === 'undefined') throw new Error('parser error -- claim and signature block is required');

	var claimAndSignature = claimAndSignatureBlock.split(conf.claimAndSignatureSeperator)
	, claimSectionsBlock = claimAndSignature[conf.claimSectionsIndex]
	, signature = claimAndSignature[conf.signatureIndex]
	, encoded = claimSectionsBlock

	, claimSections = claimSectionsBlock.split(conf.sectionSeperator)
	, claimset = claimSections[conf.claimsetIndex]
	, details = claimSections[conf.detailsIndex]
	, expiration = claimSections[conf.timestampIndex]
	;

	if ('undefined' === typeof claimset) throw new Error('parser error -- claimset section is required');
	if ('undefined' === typeof details) throw new Error('parser error -- details section is required');
	if ('undefined' === typeof expiration) throw new Error('parser error -- expiration section is required');

	var detailBlocks = details.split(conf.itemSeperator)
	, len = detailBlocks.length
	, i = -1
	, parsedDetails = {}
	;

	while(++i < len) {
		var block = detailBlocks[i].split(conf.claimsetSeparator)
		, claimsetId = parseInt(block.slice(conf.claimsetIdIndex, conf.claimsetDetailsIndex)[0], 16)
		, rawDetailsArray = block.slice(conf.claimsetDetailsIndex)
		, detailsArrayLen = rawDetailsArray.length
		, j = -1
		, parsedValues = {}
		;

		while(++j < detailsArrayLen) {
			var rules = rawDetailsArray[j].split(conf.detailSeperator)
			, detailRuleId = rules[conf.detailsRuleIdIndex]
			, detail = rules[conf.detailsRuleIndex]
			;
	
			parsedValues[detailRuleId] = detail;
		}

		parsedDetails[claimsetId] = parsedValues;
	}

	var claimBlocks = claimset.split(conf.itemSeperator)
	, len = claimBlocks.length
	, i = -1
	, claimsets = {}
	, knownIdentityValues = {}
	;
	while(++i < len) {
		var block = claimBlocks[i].split(conf.claimsetSeparator)
		, claimsetId = parseInt(block[conf.claimsetIdIndex], 16)
		, claimsetRules = parseInt(block[conf.claimsetRulesIndex], 16)
		, claims = {}
		, b = 1;
		;

		while (b <= claimsetRules) {
			if (b === (b & claimsetRules)) {
				var options = { id: b }
				, claimsetDetails = parsedDetails[claimsetId]
				;
				
				if (claimsetDetails) {
					var encodedValue = claimsetDetails[b];
					options.value = fromBase64(encodedValue);
				}

				options.kind = typeof options.value !== 'undefined' ? Claim.kinds.identity : Claim.kinds.unknown;

				claims[b] = options;
			}

			b *= 2;
		}

		claimsets[claimsetId] = { id: claimsetId, claims: claims };
	}

	var options = {
		version: version
	, claimsets: claimsets
	, embeddedIdentities: parsedDetails
	, expiration: expiration
	, signature: signature
	, encoded: encoded
	, ticket: ticket
	}
	;

	var result = options;

	return from(result, verifier, claimsAuth);
}

function toBase64(s) {
	return new Buffer(s, 'utf8').toString('base64');
}

function fromBase64(s) {
	return new Buffer(s, 'base64').toString('utf8');
}

function from(data, verifier, claimsAuth) {
	var claimsets = {}
	, knownIdentityValues = {}
	;
	for (var csid in data.claimsets) {
		var claims = {}
		, claimsetOptions = data.claimsets[csid]
		, knownClaimset = knownIdentities[claimsetOptions.id]
		;
		for (var cid in claimsetOptions.claims) {
			var claimOptions = claimsetOptions.claims[cid];
			if (knownClaimset) {
				var knownIdentity = knownClaimset[cid];
				if (knownIdentity) {
					claimOptions.name = knownIdentity;
					knownIdentityValues[knownIdentity] = claimOptions.value;
				}
			}
			claims[claimOptions.id] = new Claim(claimOptions);
		}
		claimsetOptions.claims = claims;
		claimsets[claimsetOptions.id] = new Claimset(claimsetOptions);
	}
	data.claimsets = claimsets;
	var result = new Claims(data);
	for (var prop in knownIdentityValues) {
		if (knownIdentityValues.hasOwnProperty(prop)) {
			Object.defineProperty(result, prop, { enumerable: true, value: knownIdentityValues[prop] });
		}
	}
	return result;
}

Object.defineProperties(module.exports, {

	decode: {
		value: function(ticket, verifier, claimsAuth) {
			return decode(ticket, verifier, claimsAuth);
		},
		enumerable: true
	},

	from: {
		value: function (data, verifier, claimsAuth) {
				if ('string' === typeof data) {
					data = JSON.parse(data);
				}
				var res = jsonschema.validate(data, schema);
				if (res.length) {
					throw new Error(res[0].message);
				}
				return from(data, verifier, claimsAuth);
		},
		enumerable: true
	}

});