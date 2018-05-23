exports = module.exports = function(IoC, tokens, logger) {
  var Tokens = require('tokens').Tokens;
  
  
  var itokens = new Tokens();
  
  return Promise.resolve(itokens)
    .then(function(itokens) {
      var components = IoC.components('http://i.bixbyjs.org/security/tokens/Schema');
      return Promise.all(components.map(function(comp) { return comp.create(); } ))
        .then(function(schemas) {
          schemas.forEach(function(schema, i) {
            var dialect = components[i].a['@schema']
              , type = components[i].a['@type'];
        
            logger.info("Loaded security token schema '" + dialect + "' of type '" + type + "'");
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
      
      api.encode = function(type, msg, to, cb) {
        console.log('ENCODE SECURITY TOKEN!');
        console.log(msg);
        console.log(to)
        
        var encoder;
        try {
          encoder = itokens.createEncoder(type);
        } catch (ex) {
          return cb(ex);
        }
        
        encoder.encode(msg, function(err, claims) {
          console.log(err);
          console.log(claims);
          
          if (err) { return cb(err); }
          tokens.seal(claims, to, null, function(err, token) {
            console.log('I SEALED!');
            console.log(err);
            console.log(token);
            
            if (err) { return cb(err); }
            return cb(null, token);
          });
        });
      };
      
      api.decode = function(token, cb) {
        console.log('DECODE!');
        console.log(token);
        
        tokens.unseal(token, function(err, claims) {
          console.log('UNSEALED?');
          console.log(err);
          console.log(claims);
          
          
          var decoder;
          try {
            decoder = itokens.createDecoder();
          } catch (ex) {
            return cb(ex);
          }
          
          decoder.decode(claims, function(err, msg) {
            if (err) { return cb(err); }
            return cb(null, msg);
            
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
