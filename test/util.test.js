'use strict';

var util = require('../lib/util')
, expect = require('expect.js')
;

describe('`util`', function () {

	describe('when `mash` is called', function () {
		var mash = util.mash;
		
		it('returns a new object', function () {	
			var original = {};
			expect(original === mash(original)).to.be(false);
		});

		it('supports any number of arguments and overwrite with right-most args\' values', function () {	
			var original = {}
			, v1 = { x: 1 }
			, v2 = { y: 2 }
			, v3 = { z: 3 }
			, v4 = { y: 5 }
			, res = mash(original, v1)
			;
			expect(res.x).to.be(1);
			res = mash(original, v1, v2, v3);
			expect(res.x).to.be(1);
			expect(res.y).to.be(2);
			expect(res.z).to.be(3);
			res = mash(res, v4);
			expect(res.y).to.be(5);
		});
	});
});