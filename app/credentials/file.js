exports = module.exports = function() {
  var path = require('path');
  var FileCredentialManager = require('../../lib/filecredentialmanager');
  
  
  return function createFileCredentialManager(options) {
    var dirname = path.dirname(require.main.filename);
    var file = path.join(dirname, 'etc/credentials.toml');
    
    var credentials = new FileCredentialManager(file);
    return credentials;
  };
};
