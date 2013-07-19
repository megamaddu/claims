'use strict';

var connect = require('connect')
, http = require('http')
, ticket = require('./ticket')
, encryptionConfig = require('./encryption/config.json')
, httpSignatureConfig = require('../node_modules/webflow/examples/trusted_client/trusted_client_config.json')
, ticket = require('./ticket')
, claims = require('../')
;

var server = connect()
	.use(connect.cookieParser())
	.use(claims({
		encryption: encryptionConfig,
		claimsAuth: {
			host: 'http://localhost:8000',
			httpSignature: {
				key: httpSignatureConfig.keys.trustedClientExampleKey.priv,
				keyId: 'trustedClientExampleKeyId'
			}
		}
	}))
	.use(function(req, res, next) {
		var body = JSON.stringify(req.claims);
		res.writeHead(200, {
		  'Content-Length': body.length,
		  'Content-Type': 'application/json'
		});
		res.end(body, 'utf8');
	})
	.listen(3000)
	;

http.get({ port: 3000, headers: { "claims-ticket": ticket.string } }, function(res) {
	var body = '';
	res.setEncoding('utf8');
  res.on('data', function (chunk) {
    body += chunk;
  });
  res.on('end', function () {
	  console.log(require('util').inspect(JSON.parse(body), false, 99));
	  server.close();
  });
});