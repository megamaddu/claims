'use strict';

var Claim = require('../lib/claim').Claim;

var ticketStr = 'mialc1#0.0f,e.08;0-01.TlM=-02.WFk=-08:MTIzNDU=;2013-06-30T18:38:36.480Z|MC4wZixlLjA4OzAtMDEuVGxNPS0wMi5XRms9LTA4Ok1USXpORFU9OzIwMTMtMDYtMzBUMTg6Mzg6MzYuNDgwWg==';
var claim = new Claim(ticketStr);

console.log(claim.expired());
console.log(claim);
console.log(claim.toString());

debugger;
console.log(claim.hasRole(0x0, 0x01));