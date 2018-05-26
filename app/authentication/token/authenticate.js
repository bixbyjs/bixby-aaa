exports = module.exports = function(tokens) {
  
  return function(token, options, cb) {
    if (typeof options == 'function') {
      cb = options;
      options = undefined;
    }
    options = options || {};
    
    tokens.decode(token, options, function(err, message, conditions, issuer) {
      if (err) { return cb(err); }
      return cb(null, message, conditions, issuer);
    });
  };
  
  /*
  return function(subject, issuer, cb) {
    // TODO: Parse subject for nameID format, relative to issuer, etc.
    //       translate into domain, realm, etc.
    
      // TODO: add support for fast path when user profile does not need
      //       to be loaded (only id is needed)
      // TODO: Add token/checker component that can verify that issuers are allowed
      //       to make assertions about subject, and other security-related checks, etc.
    
    directory.find(subject.id, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      return cb(null, user);
    });
  };
  */
};

exports['@implements'] = 'http://i.bixbyjs.org/security/authentication/token/authenticate';
exports['@require'] = [
  'http://i.bixbyjs.org/security/tokens'
];
//exports['@require'] = [ 'http://i.bixbyjs.org/ds/Directory' ];
