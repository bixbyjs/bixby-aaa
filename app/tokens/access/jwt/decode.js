exports = module.exports = function() {
  
  
  return function decode(claims, options, cb) {
    console.log('INTERPRET JWT!!!!');
    console.log(claims);
    console.log(options);
    
    if (!(claims.iss || claims.sub || claims.aud)) {
      // not a dialect we understand
      return cb();
    }
    
    console.log('IS A JWT!');
    
    
    var params = {};
    params.subject = { id: claims.sub };
    params.client = { id: claims.cid };
    return cb(null, params);
  };
};
