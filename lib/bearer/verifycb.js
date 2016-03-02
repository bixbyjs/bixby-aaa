exports = module.exports = function(tokens) {
  
  return function(token, cb) {
    
    tokens.decode(token, function(err, claims) {
      console.log('DECODED TOKEN');
      console.log(err);
      console.log(claims);
      
      
      
      if (err) { return cb(err); }
      
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
