exports = module.exports = function(clientCb, tokenCb, validateCb) {
  var TokenStrategy = require('passport-http-oauth').TokenStrategy;
  
  var strategy = new TokenStrategy(clientCb, tokenCb, validateCb);
  return strategy;
};


exports['@require'] = [
  './_oauth/clientcb',
  './_oauth/tokencb',
  './_oauth/validatecb'
];

exports['@implements'] = 'http://i.bixbyjs.org/http/auth/Scheme';
exports['@scheme'] = 'oauth';
