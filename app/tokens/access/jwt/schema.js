exports = module.exports = function(encode, decode) {
  
  return {
    encode: encode,
    decode: decode
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/security/tokens/Schema';
exports['@type'] = 'access';
exports['@schema'] = 'urn:ietf:params:oauth:token-type:jwt';
exports['@require'] = [
  './encode',
  './decode'
];
