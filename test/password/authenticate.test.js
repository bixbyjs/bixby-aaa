/* global describe, it, expect */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../lib/password/authenticate');


describe('password/authenticate', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
});
