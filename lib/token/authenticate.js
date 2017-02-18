exports = module.exports = function(Tokens) {
  
  return function(subject, issuer, cb) {
    console.log('## AUTH TOKEN');
    console.log(subject);
    console.log(issuer);
    
    
    return cb(null, { id: '1', subject: 'usr_joe' });
    
    
    Tokens.decode(token, function(err, claims) {
      if (err) { return cb(err); }
      
      if (claims.confirmation) {
        // TODO: Give a good message here.
        return cb(null, false);
      }
      
      // TODO: This was the result supplied by OAuth-based token callback.  Figure
      //       out and document why the extra info was supplied with confirmation key
      /*
      // TODO: Make sure this supports privKeys as well as symmentric
      return cb(null, { id: claims.subject }, claims.confirmation.key);
      */
      
      // TODO: Load user record based on claims subject, name format, etc
      return cb(null, { id: claims.subject });
    });
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/aaa/token/authenticate';
exports['@require'] = [];
