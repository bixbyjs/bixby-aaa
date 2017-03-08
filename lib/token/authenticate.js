exports = module.exports = function(directory) {
  
  return function(subject, issuer, cb) {
    // TODO: Parse subject for nameID format, relative to issuer, etc.
    //       translate into domain, realm, etc.
    
    directory.find(subject.id, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      return cb(null, user);
    });
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/aaa/token/authenticate';
exports['@require'] = [ 'http://i.bixbyjs.org/ds/Directory' ];
