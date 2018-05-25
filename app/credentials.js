exports = module.exports = function(container, file) {
  var Factory = require('fluidfactory');
  
  
  var factory = new Factory();
  
  return Promise.resolve(factory)
    .then(function(factory) {
      var createImplComps = container.components('http://i.bixbyjs.org/security/CredentialsProvider');
      return Promise.all(createImplComps.map(function(comp) { return comp.create(); } ))
        .then(function(impls) {
          impls.forEach(function(impl) {
            factory.use(impl);
          });
          
          factory.use(file);
        })
        .then(function() {
          return factory;
        });
    })
    .then(function(factory) {
      return factory.create();
    });
};

exports['@implements'] = 'http://i.bixbyjs.org/security/CredentialManager';
exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  './credentials/file'
];
