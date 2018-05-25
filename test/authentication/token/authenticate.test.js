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
      var message, conditions, issuer;
      
      before(function() {
        var message = {
          user: { id: '1' },
          client: { id: 's6BhdRkqt3' },
          scope: [ 'read:foo', 'write:foo' ]
        }
        var conditions = {
          oneTimeUse: true
        }
        var issuer = {
          identifier: 'https://server.example.com'
        }
        
        sinon.stub(tokens, 'decode').yields(null, message, conditions, issuer);
      });
      
      after(function() {
        tokens.decode.restore();
      });
      
      before(function(done) {
        var authenticate = factory(tokens);
        
        authenticate('2YotnFZFEjr1zCsicMWpAA', function(err, m, c, i) {
          if (err) { return done(err); }
          message = m;
          conditions = c;
          issuer = i;
          done();
        })
      });
      
      it('should decode token', function() {
        expect(tokens.decode.callCount).to.equal(1);
        expect(tokens.decode.args[0][0]).to.equal('2YotnFZFEjr1zCsicMWpAA');
      });
      
      it('should yield message', function() {
        expect(message).to.deep.equal({
          user: { id: '1' },
          client: { id: 's6BhdRkqt3' },
          scope: [ 'read:foo', 'write:foo' ]
        });
      });
      
      it('should yield conditions', function() {
        expect(conditions).to.deep.equal({ oneTimeUse: true });
      });
      
      it('should yield issuer', function() {
        expect(issuer).to.deep.equal({ identifier: 'https://server.example.com' });
      });
    }); // valid token
    
  }); // authenticate
  
});
