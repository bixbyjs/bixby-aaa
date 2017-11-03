/* global describe, it, expect */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../app/authentication/password/verify');


describe('authentication/password/authenticate', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/security/authentication/password/verify');
    expect(factory['@singleton']).to.be.undefined;
  });
  
});
