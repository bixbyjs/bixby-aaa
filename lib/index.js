exports = module.exports = function auth(id) {
  var map = {
    'bearer/verifycb': './bearer/verifycb',
    'net/http/bearer': './net/http/bearer'
  };
  
  var mid = map[id];
  if (mid) {
    return require(mid);
  }
};

exports.used = function(container) {
  container.register('net/http/bearer');
};
