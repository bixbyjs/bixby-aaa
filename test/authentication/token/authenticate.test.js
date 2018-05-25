/* global describe, it, expect */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../app/authentication/token/authenticate');


describe('authentication/token/authenticate', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/security/authentication/token/authenticate');
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('authenticate', function() {
    var tokens = {
      decode: function(){}
    }
    
    
    describe('valid token', function() {
      var user, info;
      
      before(function() {
        sinon.stub(tokens, 'decode').yields(null, { id: '501', username: 'johndoe' });
      });
      
      after(function() {
        tokens.decode.restore();
      });
      
      before(function(done) {
        var authenticate = factory(tokens);
        
        authenticate('2YotnFZFEjr1zCsicMWpAA', function(err, u, i) {
          if (err) { return done(err); }
          user = u;
          info = i;
          done();
        })
      });
      
      it('should decode token', function() {
        expect(tokens.decode.callCount).to.equal(1);
        expect(tokens.decode.args[0][0]).to.equal('2YotnFZFEjr1zCsicMWpAA');
      });
      
      /*
      it('should yield user', function() {
        expect(user).to.deep.equal({ id: '501', username: 'johndoe' });
      });
      
      it('should yield info', function() {
        expect(info).to.deep.equal({ method: 'password' });
      });
      */
    }); // valid token
    
  }); // authenticate
  
});
