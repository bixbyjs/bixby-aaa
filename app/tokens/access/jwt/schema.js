exports = module.exports = function(encode, decode) {
  
  return {
    encode: encode,
    decode: decode
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens/Dialect';
//exports['@type'] = 'urn:ietf:params:oauth:token-type:jwt';
exports['@type'] = 'application/at+jwt';
exports['@require'] = [
  './encode',
  './decode'
];
