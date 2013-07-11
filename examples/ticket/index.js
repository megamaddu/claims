var preamble = module.exports.preamble = require('./preamble')
, version = module.exports.version = require('./version')
, claimsets = module.exports.claimsets = require('./claimsets')
, timestamp = module.exports.timestamp = require('./timestamp')
, signature = module.exports.signature = require('./signature')
, ticket = module.exports.string = ''.concat(preamble, version, '#', claimsets, ';', timestamp, '|', signature)
;