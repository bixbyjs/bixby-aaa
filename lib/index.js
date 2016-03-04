exports = module.exports = function auth(id) {
  var map = {
    'bearer': './bearer',
    'bearer/_internals/verifycb': './bearer/_internals/verifycb'
  };
  
  var mid = map[id];
  if (mid) {
    return require(mid);
  }
};

exports.used = function(container) {
  container.register('bearer');
};
