exports = module.exports = function(tokens) {
  
  var svc = {};
  
  svc.verify = function(token, options, cb) {
    if (typeof options == 'function') {
      cb = options;
      options = undefined;
    }
    options = options || {};
    
    
    var unsealer;
    try {
      unsealer = tokens.createUnsealer();
    } catch (ex) {
      return cb(ex);
    }
    
    unsealer.unseal(token, options, function(err, claims, conditions, issuer) {
      var dialect;
      try {
        dialect = tokens.createDeserializer();
      } catch (ex) {
        return cb(ex);
      }
      
      dialect.deserialize(claims, function(err, msg) {
        if (err) { return cb(err); }
        return cb(null, msg);
      });
    });
  };
  
  return svc;
  
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

exports['@implements'] = 'http://i.bixbyjs.org/security/TokenService';
exports['@require'] = [
  'http://i.bixbyjs.org/tokens'
];
//exports['@require'] = [ 'http://i.bixbyjs.org/ds/Directory' ];
