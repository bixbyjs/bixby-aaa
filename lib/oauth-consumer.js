exports = module.exports = function(clients) {
  var ConsumerStrategy = require('passport-http-oauth').ConsumerStrategy;
  
  var consumerStrategy = new ConsumerStrategy(
    function(consumerKey, cb) {
      clients.query(consumerKey, function(err, client) {
        if (err) { return cb(err); }
        if (!client) { return cb(null, false); }
        return cb(null, client, client.secret);
      });
    },
    function(requestToken, cb) {
      // FIXME: Encode all the needed info here.
      /*
      var info = { verifier: 'v123',
        clientID: '1',
        userID: 'u1',
        approved: true
      }
      */
      
      return cb(null, 's3cr1t', { verifier: 'v123' });
    },
    function(timestamp, nonce, cb) {
      // validate the timestamp and nonce as necessary
      cb(null, true)
    }
  );
  
  return consumerStrategy;
};


exports['@require'] = [ 'http://schemas.modulate.io/js/aaa/clients/Directory' ];

exports['@implements'] = 'http://i.bixbyjs.org/http/auth/Scheme';
exports['@scheme'] = 'oauth-consumer';
