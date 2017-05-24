exports = module.exports = function(directory) {
  
  return function(username, password, cb) {
    directory.authenticate(username, password, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      return cb(null, user);
    });
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/security/authentication/password/authenticate';
exports['@require'] = [ 'http://i.bixbyjs.org/ds/Directory' ];
