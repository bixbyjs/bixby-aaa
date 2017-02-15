/* global describe, it */

var pkg = require('..');
var expect = require('chai').expect;


describe('bixby-aaa', function() {
  
  it('should export manifest', function() {
    expect(pkg).to.be.an('object');
    expect(pkg['password/authenticate']).to.be.a('function');
    expect(pkg['token/authenticate']).to.be.a('function');
  });
  
});
