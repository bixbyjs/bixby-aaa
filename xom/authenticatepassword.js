exports = module.exports = function() {
  
  // TODO: Implement this for real.
  return function(username, password, cb) {
    if (password !== 'secret') { return cb(null, false); }
    return cb(null, { id: '1', username: username });
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/aaa/authenticatePasswordFunc';
exports['@require'] = [];
