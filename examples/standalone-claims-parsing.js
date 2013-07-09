'use strict';

var claims = require('..')
, ticket = require('./ticket')
, util = require('util')
;

var parsed = claims(ticket.string);
console.log(util.inspect(parsed, true, 99));