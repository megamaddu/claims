claims [![Build Status](https://travis-ci.org/netsteps/claims.png?branch=master)](http://travis-ci.org/netsteps/claims)
======

A [nodejs](http://nodejs.org/) API client for federated claims-based authorization, including parsing and validating claims tickets and interacting with claims authorities.

# Background

Claims-based authorization is a natural successor to role-based security. It is ideal for _service-oriented architectures_ wherein independent services perform actions on users' behalf and need an efficient way to trust users` identities, permissions, and security related facts.

Implicit in this claims-based model, a _claims ticket_ flows across the entire call-stack (or request chain). This module does not deal with how the _claims ticket_ is communicated, it allows clients to reason about them once they have one in hand.

This module handle's round-trip encoding of claims into _claims tickets_. Its primary use is to decode the ticket, verify the ticket's content is trusted, and put the content into an easy to use `Claims` object. After being decoded, the `Claims` object can be interrogated to inform business logic about a user's identity, permissions, and security related facts.

From an independent service's perspective, this module provides the means by which it can trust the identity of users and their claims.

# Installing

```bash
npm install claims
```

# Usage

As `connect` middleware: [connect example](http://github.com/netsteps/claims/blob/master/examples/connect-integration.js)
```javascript
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
```

As a standalone module: [standalone example](http://github.com/netsteps/claims/blob/master/examples/standalone-claims-parsing.js)
```javascript
var util = require('util')
, ticket = require('./ticket')
, verify = require('./dummy-encryption').verify
, claims = require('..')({ verifier: verify, claisAuth: { host: 'localhost', port: 8000 } })
;

claims(ticket.string, function (err, res) {
	if (err) throw err;
	console.log(util.inspect(err || res, false, 99));
	debugger;
	var x = res.verified;
	var y = res.isValid;
	debugger;
});
```

# Detailed Steps

