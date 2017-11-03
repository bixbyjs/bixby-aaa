exports = module.exports = function(directory) {
  
  return function(username, password, cb) {
    directory.authenticate(username, password, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      
      var info = { method: 'password' };
      return cb(null, user, info);
    });
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/security/authentication/password/verify';
exports['@require'] = [ 'http://i.bixbyjs.org/ds/Directory' ];
