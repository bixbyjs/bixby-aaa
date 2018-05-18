/* global describe, it */

var $require = require('proxyquire');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../../app/tokens/access/jwt/decode');


describe('tokens/access/jwt/decode', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.be.undefined;
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('creating decode', function() {
    var decodeSpy = sinon.stub();
    
    var factory = $require('../../../../app/tokens/access/jwt/decode',
      { 'tokens': { types: { access: { decode: decodeSpy } } } });
    var decode = factory();
    
    it('should create encode', function() {
      expect(decodeSpy).to.have.been.calledOnce;
      expect(decodeSpy).to.have.been.calledWithExactly();
    });
  });
  
});
