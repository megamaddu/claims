'use strict';

var dbc = require('dbc.js')
, Claim = require('./claim')
,	Claimset = require('./claimset')
, Claims = require('./claims')
;

var conf = {
	preamble: 'mialc'
	,versionAndClaimAndImpersonatorSeperator: '#'
	,claimAndSignatureSeperator: '|'
	,sectionSeperator: ';'
	,itemSeperator: ','
	,detailSeperator: ':'
	,claimsetSeparator: '.'
	,claimIndex: 1
	,impersonatorIndex: 2
	,claimSectionsIndex: 0
	,versionIndex: 0
	,claimsetIndex: 0
	,claimsetHeaderIndex: 0
	,rulesIndex: 1
	,detailsIndex: 1
	,timestampIndex: 2
	,signatureIndex: 1
};

function decode(claimToken) {
	dbc([typeof claimToken === 'string'], 'claim must be a string');
	dbc([claimToken.slice(0, conf.preamble.length) === conf.preamble], 'preamble missing or corrupt');

	var versionAndClaimAndImpersonator = claimToken.slice(conf.preamble.length).split(conf.versionAndClaimAndImpersonatorSeperator);
	var version = versionAndClaimAndImpersonator[conf.versionIndex]
		, claimAndSignatureBlock = versionAndClaimAndImpersonator[conf.claimIndex]
		, impersonator = versionAndClaimAndImpersonator[conf.impersonatorIndex];

	dbc([typeof version !== 'undefined'], 'version is required');
	dbc([typeof claimAndSignatureBlock !== 'undefined'], 'claim and signature block is required');

	var claimAndSignature = claimAndSignatureBlock.split(conf.claimAndSignatureSeperator);
	var claimSectionsBlock = claimAndSignature[conf.claimSectionsIndex];
	var signature = claimAndSignature[conf.signatureIndex];
	dbc([sign(claimSectionsBlock) === signature], 'signature invalid');
	
	var claimSections = claimSectionsBlock.split(conf.sectionSeperator);
	var claimset = claimSections[conf.claimsetIndex];
	var details = claimSections[conf.detailsIndex];
	var timestamp = claimSections[conf.timestampIndex];
	dbc([typeof claimset !== 'undefined'], 'claimset section is required');
	dbc([typeof details !== 'undefined'], 'details section is required');
	dbc([typeof timestamp !== 'undefined'], 'timestamp section is required');

	claimset = claimset.toString(16).concat('.');
	var _claimset = this._claimset;
	var idx = _claimset.indexOf(claimset);
	var rules = parseInt(_claimset.slice(idx + 2, idx + 4), 16);

	// build models

}


function toBase64(s) {
	return new Buffer(s, 'utf8').toString('base64');
}

function fromBase64(s) {
	return new Buffer(s, 'base64').toString('utf8');
}

function sign(s) { // placeholder for real encryption
	return toBase64(s);
}

/////////

function toString() {
	return this._raw;
}

function expired() {
	return new Date() > new Date(this._timestamp);
}

function _hasRole(claimset, rule) {
	claimset = claimset.toString(16).concat('.');
	var _claimset = this._claimset;
	var idx = _claimset.indexOf(claimset);
	var rules = parseInt(_claimset.slice(idx + 2, idx + 4), 16);
	return rule === (rule & rules);
}

function hasRole(claimset, rule) {
	dbc([typeof claimset === 'number' || typeof claimset === 'string'])
	dbc([typeof rule === 'number' || typeof rule === 'string'])

	if (typeof claimset === 'string') {
		claimset = parseInt(claimset, 16);
	}
	if (typeof rule === 'string') {
		rule = parseInt(rule, 16);
	}

	return !this.expired() && this._hasRole(claimset, rule);
}

module.exports.decode = decode;