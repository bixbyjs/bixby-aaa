/* global describe, it */

var expect = require('chai').expect;
var factory = require('../../../../app/tokens/access/jwt/schema');


describe('tokens/access/jwt/schema', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/security/tokens/Schema');
    expect(factory['@type']).to.equal('access');
    expect(factory['@schema']).to.equal('urn:ietf:params:oauth:token-type:jwt');
    expect(factory['@singleton']).to.be.undefined;
  });
  
});
