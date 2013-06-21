'use strict';

var dbc = require('dbc.js')
, Claim = require('./claim')
,	Claimset = require('./claimset')
, Claims = require('./claims')
, verifier = require('./')
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
};

var __verifier = undefined;

function decode(claimsTicket, verifier) {
	dbc([claimsTicket.slice(0, conf.preamble.length) === conf.preamble], 'preamble missing or corrupt');

	var versionAndClaimAndImpersonator = claimsTicket.slice(conf.preamble.length).split(conf.versionAndClaimAndImpersonatorSeperator);
	var version = versionAndClaimAndImpersonator[conf.versionIndex]
		, claimAndSignatureBlock = versionAndClaimAndImpersonator[conf.claimIndex]
		, impersonator = versionAndClaimAndImpersonator[conf.impersonatorIndex];

	dbc([typeof version !== 'undefined'], 'version is required');
	dbc([typeof claimAndSignatureBlock !== 'undefined'], 'claim and signature block is required');

	var claimAndSignature = claimAndSignatureBlock.split(conf.claimAndSignatureSeperator)
	, claimSectionsBlock = claimAndSignature[conf.claimSectionsIndex]
	, signature = claimAndSignature[conf.signatureIndex]
	, verified = verifier.verify(claimSectionsBlock, signature)
	
	, claimSections = claimSectionsBlock.split(conf.sectionSeperator)
	, claimset = claimSections[conf.claimsetIndex]
	, details = claimSections[conf.detailsIndex]
	, timestamp = claimSections[conf.timestampIndex]
	;

	dbc([typeof claimset !== 'undefined'], 'claimset section is required');
	dbc([typeof details !== 'undefined'], 'details section is required');
	dbc([typeof timestamp !== 'undefined'], 'timestamp section is required');

debugger;
	var claimBlocks = claimset.split(conf.itemSeperator)
	, len = claimBlocks.length
	, i = -1
	, claimsets = {}
	;
	while(++i < len) {
		var block = claimBlocks[i].split(conf.claimsetSeparator)
		, claimsetId = parseInt(block[conf.claimsetIdIndex], 16)
		, claimsetRules = parseInt(block[conf.claimsetRulesIndex], 16)
		, claims = {}
		, b = -1;
		;

		while (++b < claimsetRules) {
			if (b === (b & claimsetRules)) {
				claims[b] = new Claim({ id: b });
			}	
		}

		claimsets[claimsetId] = new Claimset({ id: claimsetId, claims: claims });
	}

	var options = {
		version: version
	, claimsets: claimsets
	, expiration: new Date(timestamp)
	, signature: signature
	, verified: verified
	, encoded: claimsTicket
	};
	return new Claims(options);
}


function toBase64(s) {
	return new Buffer(s, 'utf8').toString('base64');
}

function fromBase64(s) {
	return new Buffer(s, 'base64').toString('utf8');
}

function sign(s) {
	return toBase64(s);
}

function isConfigured() {
	return __verifier && __verifier.isConfigured;
}

function $init($config, verifier) {
	if (typeof $config !== 'undefined' && !isConfigured()) {
		__verifier = verifier;
	}
}

Object.defineProperties($init, {

	decode: {
		value: function (claimsTicket, keyName) {
			dbc([isConfigured], 'parser not configured');
			dbc([typeof __verifier !== 'undefined'], 'verifier not defined');
			dbc([typeof claimsTicket === 'string'], 'claimsTicket must be a string');
			dbc([typeof keyName === 'string', keyName.length], 'keyName must be a non-empty string');
			return decode(claimsTicket, new __verifier.create(keyName));
		},
		enumerable: true
	},

	isConfigured: {
		get: isConfigured,
		enumerable: true
	}

});

module.exports = $init;