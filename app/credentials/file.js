exports = module.exports = function() {
  var FileCredentialManager = require('../../lib/filecredentialmanager');
  
  
  return function createFileCredentialManager(options) {
    var credentials = new FileCredentialManager();
    return credentials;
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/security/createCredentialManagerImpl';
