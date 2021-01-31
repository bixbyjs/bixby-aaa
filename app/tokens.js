exports = module.exports = function(IoC, logger) {
  var Tokens = require('tokens').Tokens;
  
  
  var tokens = new Tokens();
  
  console.log('!!!!!!!!!!!! LOADING TOKENS!!!!');
  
  return Promise.resolve(tokens)
    .then(function(tokens) {
      return new Promise(function(resolve, reject) {
        var components = IoC.components('http://i.bixbyjs.org/security/tokens/Format');
        
        (function iter(i) {
          var component = components[i];
          if (!component) {
            return resolve(tokens);
          }
          
          component.create()
            .then(function(format) {
              logger.info('Loaded security token format: ' + component.a['@type']);
              tokens.format(component.a['@type'], format);
              
              //tokens.use(component.a['@type'], format);
              iter(i + 1);
            }, function(err) {
              var msg = 'Failed to load security token format: ' + component.a['@type'] + '\n';
              msg += err.stack;
              logger.warning(msg);
              return iter(i + 1);
            })
        })(0);
      });
    })
    .then(function(tokens) {
      return tokens;
    });
};

exports['@implements'] = 'http://i.bixbyjs.org/security/tokens';
exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Logger'
];
