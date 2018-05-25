exports = module.exports = function(IoC, tokens, logger) {
  var Tokens = require('tokens').Tokens;
  
  
  var itokens = new Tokens();
  
  return Promise.resolve(itokens)
    .then(function(itokens) {
      var components = IoC.components('http://i.bixbyjs.org/security/tokens/Schema');
      return Promise.all(components.map(function(comp) { return comp.create(); } ))
        .then(function(schemas) {
          schemas.forEach(function(schema, i) {
            var type = components[i].a['@type'];
        
            logger.info('Loaded security token schema: ' + type);
            //logger.info("Loaded security token schema '" + dialect + "' of type '" + type + "'");
            //itokens.schema(dialect, type, schema)
            itokens.schema(type, schema);
          });
        })
        .then(function() {
          return itokens;
        });
    })
    .then(function(itokens) {
      var api = {};
      
      api.encode = function(message, recipients, options, cb) {
        console.log('ENCODE SECURITY TOKEN!');
        console.log(message);
        console.log(recipients)
        
        var encoder;
        try {
          encoder = itokens.createEncoder(options.schema);
        } catch (ex) {
          return cb(ex);
        }
        
        encoder.encode(message, function(err, claims) {
          console.log(err);
          console.log(claims);
          
          options.token = options.token || {};
          options.token.confidential = options.confidential;
          
          if (err) { return cb(err); }
          tokens.seal(claims, recipients, options.token, function(err, token) {
            console.log('I SEALED!');
            console.log(err);
            console.log(token);
            
            if (err) { return cb(err); }
            return cb(null, token);
          });
        });
      };
      
      api.decode = function(token, cb) {
        tokens.unseal(token, function(err, claims, issuer, conditions) {
          if (err) { return cb(err); }
          
          var decoder;
          try {
            decoder = itokens.createDecoder();
          } catch (ex) {
            return cb(ex);
          }
          
          decoder.decode(claims, function(err, message) {
            if (err) { return cb(err); }
            return cb(null, message, issuer, conditions);
          });
        });
      };
      
      return api;
    });
};

exports['@implements'] = 'http://i.bixbyjs.org/security/tokens';
exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/tokens',
  'http://i.bixbyjs.org/Logger'
];
