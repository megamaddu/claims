var claims = require('..')
, config   = require('nconf')
, path     = require('path')
, expect   = require('expect.js')
;

describe('digital signatures', function() {

	describe('can be configured via `claims` when used as a function', function() {

		config.file(path.resolve('./test/test_config.json'));
		claims(config);

		it('it is configured', function() {
			expect(claims.isConfigured).to.be(true);
			expect(claims.signer.isConfigured).to.be(true);
			expect(claims.verifier.isConfigured).to.be(true);
		});

		var signer, verifier, sig
		, data = "this is data to sign"
		;

		it('#signer can create instances of Signer', function() {
			signer = claims.signer.create('global');
			expect(signer).to.be.a(claims.signer.Signer);
		});

		it('#verifier can create instances of Verifier', function() {
			verifier = claims.verifier.create('global');
			expect(verifier).to.be.a(claims.verifier.Verifier);
		});

		it('#signer can create create digital signatures', function() {
			sig = signer.sign(data);
			expect(sig).to.be.ok();
		});

		it('#verifier can verify digital signatures', function() {
			expect(verifier.verify(data, sig)).to.be.ok(true);
		});


	});

});