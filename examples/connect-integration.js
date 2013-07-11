'use strict';

var connect = require('connect')
, http = require('http')
, ticket = require('./ticket')
, verify = require('./dummy-encryption').verify
, claims = require('..')
;

connect()
	.use(connect.cookieParser())
	.use(claims({ verifier: verify, claisAuth: { host: 'localhost', port: 8000 } }))
	.use(function(req, res, next) {
		var body = JSON.stringify(req.claims);
		res.writeHead(200, {
		  'Content-Length': body.length,
		  'Content-Type': 'application/json'
		});
		res.end(body);
	})
	.listen(3000)
	;

http.get({ port: 3000, headers: { "claims-ticket": ticket.string } }, function(res) {
	var body = '';
  res.on('data', function (chunk) {
    body += chunk;
  });
  console.log(body);
});