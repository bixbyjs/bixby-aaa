exports = module.exports = function(Tokens) {

  return function(token, cb) {
    Tokens.decode(token, function(err, claims) {
      if (err) { return cb(err); }
      
      if (!claims.confirmation) {
        // TODO: Give a good message here.
        return cb(null, false);
      }
    
      // TODO: Make sure this supports privKeys as well as symmentric
      return cb(null, { id: claims.subject }, claims.confirmation.key);
    });
  };
};

exports['@require'] = [ 'http://i.bixbyjs.org/tokens/Decoder' ];
