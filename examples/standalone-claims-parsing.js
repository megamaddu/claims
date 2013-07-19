'use strict';

var util = require('util')
, ticket = require('./ticket')
, encryptionConfig = require('./encryption/config.json')
, httpSignatureConfig = require('../node_modules/webflow/examples/trusted_client/trusted_client_config.json')
, ticket = require('./ticket')
, claims = require('../')({
		encryption: encryptionConfig,
		claimsAuth: {
			host: 'http://localhost:8000',
			httpSignature: {
				key: httpSignatureConfig.keys.trustedClientExampleKey.priv,
				keyId: 'trustedClientExampleKeyId'
			}
		}
	})
;

claims(ticket.string, function (err, res) {
	if (err) throw err;
	console.log('claims: '.concat(util.inspect(res, false, 99)));
	console.log('claims.verified: '.concat(res.verified));
	console.log('claims.isValid: '.concat(res.isValid));
});