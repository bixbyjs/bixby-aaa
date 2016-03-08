exports = module.exports = function(clients, Tokens) {
  var TokenStrategy = require('passport-http-oauth').TokenStrategy;
  
  var tokenStrategy = new TokenStrategy(
    function(consumerKey, cb) {
      clients.query(consumerKey, function(err, client) {
        if (err) { return cb(err); }
        if (!client) { return cb(null, false); }
        return cb(null, client, client.secret);
      });
    },
    function(accessToken, cb) {
      Tokens.decode(accessToken, function(err, claims) {
        if (err) { return cb(err); }
        
        if (!claims.confirmation) {
          // TODO: Give a good message here.
          return cb(null, false);
        }
      
        // TODO: Make sure this supports privKeys as well as symmentric
        return cb(null, { id: 'usr1' }, claims.confirmation.key);
      });
    },
    function(timestamp, nonce, cb) {
      // validate the timestamp and nonce as necessary
      cb(null, true)
    }
  );
  
  return tokenStrategy;
};


exports['@require'] = [
  'http://schemas.modulate.io/js/aaa/clients/Directory',
  'http://i.bixbyjs.org/tokens/Decoder'
];

exports['@implements'] = 'http://i.bixbyjs.org/http/auth/Scheme';
exports['@scheme'] = 'oauth';
