'use strict';

var ticket = require('../examples/ticket');

module.exports = JSON.stringify({
	"version": ticket.version,
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
	"expiration": ticket.timestamp,
	"ticket": ticket.string,
	"signature": ticket.signature,
	"encoded": ''.concat(ticket.claimsets, ';', ticket.timestamp)
});