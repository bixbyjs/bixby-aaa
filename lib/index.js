exports = module.exports = function auth(id) {
  var map = {
    'bearer': './bearer',
    'bearer/_internals/verifycb': './bearer/_internals/verifycb',
    'oauth-consumer': './oauth-consumer',
    'oauth-token': './oauth-token'
  };
  
  var mid = map[id];
  if (mid) {
    return require(mid);
  }
};

exports.used = function(container) {
  container.register('bearer');
  container.register('oauth-consumer');
  container.register('oauth-token');
};
