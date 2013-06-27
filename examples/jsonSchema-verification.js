'use strict';

var helper = require('../test/claims_setup.helper.js')
, validate = require('jsonschema').validate
, util = require('util')
, schema = require('../lib/claims/schema.json')
;

var data = {
	"version": "1",
	"claimsets": {
		"0": {
			"id": 0,
			"claims": {
				"1": {
					"id": 1,
					"kind": "i",
					"name": "super",
					"value": "NS"
				},
				"2": {
					"id": 2,
					"kind": "i",
					"name": "commissioner",
					"value": "XY"
				},
				"4": {
					"id": 4,
					"kind": "i",
					"name": "realm",
					"value": "ns"
				},
				"8": {
					"id": 8,
					"kind": "i",
					"name": "tenant",
					"value": "pws"
				}
			}
		},
		"14": {
			"id": 14,
			"claims": {
				"8": {
					"id": 8,
					"kind": "i",
					"value": "testValue"
				}
			}
		}
	},
	"expiration": "3000-06-30T18:38:36.480Z",
}

console.log(util.inspect(validate(data, schema), true, 99));