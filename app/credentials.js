exports = module.exports = function(container, file) {
  var path = require('path')
    , Factory = require('fluidfactory');
  
  
  var PluggableCredentialStore = require('../lib/credentials/pluggable')
    , NetrcCredentialStore = require('../lib/credentials/netrc')
    , EnvCredentialStore = require('../lib/credentials/env')
  
  var store = new PluggableCredentialStore();
  
  store.use(new NetrcCredentialStore());
  store.use(new EnvCredentialStore());
  return store;
  
  
  //return new NetrcCredentialStore();
  
  var factory = new Factory();
  
  return Promise.resolve(factory)
    .then(function(factory) {
      var createImplComps = container.components('http://i.bixbyjs.org/security/CredentialsStoreProvider');
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
      return new Promise(function(resolve, reject) {
        // TODO: put service discovery into here
        process.nextTick(function() {
          var dirname = path.dirname(require.main.filename);
          var file = path.join(dirname, 'etc/credentials.toml');
          var url = 'file://' + file;
          resolve(factory.create(url));
        })
      });
    });
};

exports['@implements'] = 'http://i.bixbyjs.org/security/Keyring';
exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  './credentials/file'
];
