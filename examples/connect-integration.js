'use strict';

var connect = require('connect')
, http = require('http')
, ticket = require('./ticket')
, verify = require('./dummy-encryption').verify
, claims = require('..')
;

var server = connect()
	.use(connect.cookieParser())
	.use(claims({ verifier: verify, claisAuth: { host: 'localhost', port: 8000 } }))
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