'use strict';

var ticket = require('./')
, encoded = ''.concat(ticket.claimsets, ';', ticket.timestamp)
, encryption = require('../encryption/config.json')
, crypto = require('../../lib/encryption')
;
crypto(encryption);
var keyName = encryption.signature.default || 'global'
, signer = crypto.signer.create(keyName)
, sig = signer.sign(encoded)
, filedata = ''.concat('module.exports = \'', sig, '\';')
;
require('fs').writeFile(require('path').join(__dirname, 'signature.js'), filedata);
console.log('wrote sig to `signatue.js` -- '.concat(sig));