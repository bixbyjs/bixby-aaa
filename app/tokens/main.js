exports = module.exports = function(IoC, encoder, decoder, logger) {
  
  var components = container.components('http://i.bixbyjs.org/security/tokens/Schema');
  return Promise.all(components.map(function(comp) { return comp.create(); } ))
    .then(function(schemas) {
      schemas.forEach(function(schema, i) {
        var type = components[i].a['@schema'];
        
        logger.info('Loaded security token schema: ' + type);
        encoder.use(type, schema)
      });
    })
    .then(function() {
      var api = {};
      
      api.encode = function(ctx, options, cb) {
        console.log('ENCODE SECURITY TOKEN!');
        console.log(ctx);
        
      });
    });
};

exports['@implements'] = 'http://i.bixbyjs.org/security/tokens';
exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  './encoder',
  './decoder',
  'http://i.bixbyjs.org/Logger'
];
