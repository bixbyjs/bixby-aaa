exports = module.exports = function(IoC, logger) {
  var Tokens = require('tokens').Tokens;
  
  
  var tokens = new Tokens();
  
  return Promise.resolve(tokens)
    .then(function(tokens) {
      var components = IoC.components('http://i.bixbyjs.org/security/tokens/Schema');
      return Promise.all(components.map(function(comp) { return comp.create(); } ))
        .then(function(schemas) {
          schemas.forEach(function(schema, i) {
            var dialect = components[i].a['@schema']
              , type = components[i].a['@type'];
        
            logger.info("Loaded security token schema '" + dialect + "' of type '" + type + "'");
            tokens.schema(dialect, type, schema)
          });
        })
        .then(function() {
          return tokens;
        });
    })
    .then(function(tokens) {
      var api = {};
      
      api.encode = function(type, msg, options, cb) {
        console.log('ENCODE SECURITY TOKEN!');
        console.log(msg);
        
        var encoder;
        try {
          encoder = tokens.createEncoder(type);
        } catch (ex) {
          return cb(ex);
        }
        
        encoder.encode(msg, function(err, claims) {
          console.log(err);
          console.log(claims);
          
        });
      };
      
      return api;
    });
};

exports['@implements'] = 'http://i.bixbyjs.org/security/tokens';
exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Logger'
];
