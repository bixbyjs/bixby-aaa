exports = module.exports = function(verifyCb) {
  var Strategy = require('passport-http-bearer');
  
  var strategy = new Strategy(verifyCb);
  return strategy;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/auth/Scheme';
exports['@require'] = [
  '../../bearer/verifycb'
];
