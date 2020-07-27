/* global describe, it, expect */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../app/sts');


describe('sts', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/security/TokenService');
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('#verify', function() {
    
    describe('verifying a token', function() {
      var unsealer = new Object();
      unsealer.unseal = sinon.stub().yieldsAsync(null, { sub: '248289761001' });
    
      var deserializer = new Object();
      deserializer.deserialize = sinon.stub().yieldsAsync(null, {
        user: { id: '248289761001' }
      });
    
      var tokens = new Object();
      tokens.createUnsealer = sinon.stub().returns(unsealer);
      tokens.createDeserializer = sinon.stub().returns(deserializer);
    
      var msg;
    
      before(function(done) {
        var sts = factory(tokens);
        sts.verify('2YotnFZFEjr1zCsicMWpAA', function(err, m) {
          if (err) { return done(err); }
          msg = m;
          done();
        });
      });
      
      it('should unseal token', function() {
        expect(unsealer.unseal.callCount).to.equal(1);
        expect(unsealer.unseal.args[0][0]).to.equal('2YotnFZFEjr1zCsicMWpAA');
        expect(unsealer.unseal.args[0][1]).to.deep.equal({});
      });
      
      it('should deserialize claims', function() {
        expect(deserializer.deserialize.callCount).to.equal(1);
        expect(deserializer.deserialize.args[0][0]).to.deep.equal({ sub: '248289761001' });
      });
    
      it('should yield message', function() {
        expect(msg).to.deep.equal({
          user: { id: '248289761001' }
        });
      });
    }); // verifying a token
    
  }); // #verify
  
});
