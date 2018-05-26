/* global describe, it */

var path = require('path');
var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../app/credentials/file');


describe('credentials/file', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.be.undefined;
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe.only('FileCredentialStore', function() {
    
    describe('containing credentials referenced by identifier', function() {
      var store = factory()('file://' + path.resolve(__dirname, '../fixtures/credentials/userinfo.toml'));
      
      describe('get credential for entity with which there is a single shared secret', function() {
        var cred;
        
        before(function(done) {
          store.get({ identifier: 'https://server.example.com' }, function(err, c) {
            if (err) { return done(err); }
            cred = c;
            done();
          });
        });
        
        it('should yield credential', function() {
          expect(cred).to.deep.equal({
            secret: 'UyLvzezoJN0VpjegQMJg0akUuYq3VHft'
          });
        });
      }); // get credential
      
    }); // containing credentials referenced by identifier
    
  }); // FileCredentialStore
  
});
