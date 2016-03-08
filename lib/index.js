exports = module.exports = function auth(id) {
  var map = {
    'bearer': './bearer',
    '_bearer/verifycb': './_bearer/verifycb',
    'oauth': './oauth',
    '_oauth/clientcb': './_oauth/clientcb',
    '_oauth/tokencb': './_oauth/tokencb',
    '_oauth/validatecb': './_oauth/validatecb'
  };
  
  var mid = map[id];
  if (mid) {
    return require(mid);
  }
};

exports.used = function(container) {
  // Authentication scheme plug-ins.
  container.register('bearer');
  container.register('oauth');
};
