/* global describe, it */

var $require = require('proxyquire');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../../app/tokens/access/jwt/encode');


describe('tokens/access/jwt/encode', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.be.undefined;
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('creating encode', function() {
    var encodeSpy = sinon.stub();
    
    var factory = $require('../../../../app/tokens/access/jwt/encode',
      { 'tokens': { jwt: { translate: encodeSpy } } });
    var encode = factory();
    
    it('should create encode', function() {
      expect(encodeSpy).to.have.been.calledOnce;
      expect(encodeSpy).to.have.been.calledWithExactly();
    });
  });
  
});
