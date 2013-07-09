var preamble = module.exports.preamble = require('./preamble')
, version = module.exports.version = require('./version')
, claimsets = module.exports.claimsets = require('./claimsets')
, signature = module.exports.signature = require('./signature')
, module.exports.string = preamble.concat(version, '#').concat(claimset, ';').concat(timestamp, '|').concat(signature)
;