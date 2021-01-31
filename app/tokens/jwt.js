exports = module.exports = function() {
  var tokens = require('tokens');
  
  function key() {
    console.log('CALLED NEW SECURITY TOKEN KEY FUNCTION');
  }
  
  return {
    seal: tokens.jwt.seal({ issuer: 'http://localhost' }, key),
    unseal: tokens.jwt.unseal(key)
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/security/tokens/Format';
exports['@type'] = 'application/jwt';
exports['@require'] = [
];
