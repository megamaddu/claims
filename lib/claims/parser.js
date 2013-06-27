'use strict';

var dbc = require('dbc.js')
, Claim = require('./claim')
,	Claimset = require('./claimset')
, Claims = require('./claims')
, verifier = require('./')
, jsonschema = require('jsonschema')
, schema = require('./schema.json')
;

var conf = {
	preamble: 'mialc'
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

var __verifier = undefined;

function decode(claimsTicket, verifier) {
	dbc([claimsTicket.slice(0, conf.preamble.length) === conf.preamble], 'preamble missing or corrupt');

	var versionAndClaimAndImpersonator = claimsTicket.slice(conf.preamble.length).split(conf.versionAndClaimAndImpersonatorSeperator)
	, version = versionAndClaimAndImpersonator[conf.versionIndex]
	, claimAndSignatureBlock = versionAndClaimAndImpersonator[conf.claimIndex]
	, impersonator = versionAndClaimAndImpersonator[conf.impersonatorIndex]
	;

	dbc([typeof version !== 'undefined'], 'version is required');
	dbc([typeof claimAndSignatureBlock !== 'undefined'], 'claim and signature block is required');

	var claimAndSignature = claimAndSignatureBlock.split(conf.claimAndSignatureSeperator)
	, claimSectionsBlock = claimAndSignature[conf.claimSectionsIndex]
	, signature = claimAndSignature[conf.signatureIndex]
	, verified = verifier.verify(claimSectionsBlock, signature)
	
	, claimSections = claimSectionsBlock.split(conf.sectionSeperator)
	, claimset = claimSections[conf.claimsetIndex]
	, details = claimSections[conf.detailsIndex]
	, expiration = claimSections[conf.timestampIndex]
	;

	dbc([typeof claimset !== 'undefined'], 'claimset section is required');
	dbc([typeof details !== 'undefined'], 'details section is required');
	dbc([typeof expiration !== 'undefined'], 'expiration section is required');

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
				
				var knownClaimset = knownIdentities[claimsetId];
				if (knownClaimset) {
					var knownIdentity = knownClaimset[b];
					if (knownIdentity) {
						options.name = knownIdentity;
						knownIdentityValues[knownIdentity] = options.value;
					}
				}

				options.kind = typeof options.value !== 'undefined' ? Claim.prototype.kinds.identity : Claim.prototype.kinds.unknown;

				claims[b] = new Claim(options);
			}

			b *= 2;
		}

		claimsets[claimsetId] = new Claimset({ id: claimsetId, claims: claims });
	}

	var options = {
		version: version
	, claimsets: claimsets
	, embeddedIdentities: parsedDetails
	, expiration: expiration
	, signature: signature
	, verified: verified
	, encoded: claimsTicket
	}
	;

	var result = new Claims(options);
	for (var prop in knownIdentityValues) {
		if (knownIdentityValues.hasOwnProperty(prop)) {
			Object.defineProperty(result, prop, { enumerable: true, value: knownIdentityValues[prop] });
		}
	}

	return result;
}

function toBase64(s) {
	return new Buffer(s, 'utf8').toString('base64');
}

function fromBase64(s) {
	return new Buffer(s, 'base64').toString('utf8');
}

function from(data) {

}

function isConfigured() {
	return (__verifier && __verifier.isConfigured);
}

function $init($config, verifier) {
	if (typeof $config !== 'undefined' && !isConfigured()) {
		__verifier = verifier;
	}
}

Object.defineProperties($init, {

	decode: {
		value: function(claimsTicket, keyName) {
			dbc([isConfigured], 'parser not configured');
			dbc([typeof __verifier !== 'undefined'], 'verifier not defined');
			dbc([typeof claimsTicket === 'string'], 'claimsTicket must be a string');
			dbc([typeof keyName === 'string', keyName.length], 'keyName must be a non-empty string');
			return decode(claimsTicket, new __verifier.create(keyName));
		},
		enumerable: true
	},

	from: {
		value: function (data) {
				if ('string' === typeof data) {
					data = JSON.parse(data);
				}
				var res = jsonschema.validate(data, schema);
				if (res.length) {
					throw new Error(res[0].message);
				}
				return from(data);
		},
		enumerable: true
	},

	isConfigured: {
		get: isConfigured,
		enumerable: true
	}

});

module.exports = $init;