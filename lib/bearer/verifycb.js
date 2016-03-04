exports = module.exports = function(tokens) {
  
  return function(token, cb) {
    
    tokens.decode(token, function(err, claims) {
      console.log('DECODED TOKEN');
      console.log(err);
      console.log(claims);
      
      
      
      if (err) { return cb(err); }
      
      if (claims.confirmation) {
        // TODO: Give a good message here.
        return cb(null, false);
      }
      
      
      
      // TODO: Fetch user attributes from directory
      var user = {
        id: claims.subjects
      }
      return cb(null, user);
    });
  };
};

exports['@require'] = [
  'http://i.bixbyjs.org/tokens/Decoder'
];
