exports = module.exports = function(verifyCb) {
  
  // TODO: Implement this for real.
  return function(username, password, cb) {
    if (password !== 'secret') { return cb(null, false); }
    return cb(null, { username: username });
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/aaa/verifyPasswordFunc';
exports['@require'] = [];
