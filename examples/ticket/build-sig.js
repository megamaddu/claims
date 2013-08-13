'use strict';

var ticket = require('./')
, encoded = ''.concat(ticket.claimsets, ';', ticket.timestamp)
, encryption = {
	signature: {
		keys: {
			global: {
				privkey: require('fs').readFileSync(require('path').join(process.env.HOME, '/.ns/dev/ns/claims-authority/key'), { encoding: 'utf8' })
			}
		}
	}
}
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