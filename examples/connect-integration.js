'use strict';

var claims = require('..')
, connect = require('connect')
, ticket = require('./ticket')
, http = require('http')
;

connect
	.use(connect.cookieParser());
	.use(claims({ options: "asdf" }));
	.use(function(res, res, next) {
		// read claims cookie ticket and return parsed claims
	})
	.listen(3000);

http.get('http://localhost:3000', function() {
	// pass ticket.string to the server above and verify response
});