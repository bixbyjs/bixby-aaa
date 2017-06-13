var uri = require('url');

function FileCredentialManager() {
}

FileCredentialManager.prototype.get = function(options, cb) {
  if (options.url) {
    var url = uri.parse(options.url);
    
    options.scheme = url.protocol.slice(0, -1); // remove trailing colon
    options.authority = url.host;
    options.path = url.path;
  }
  
  switch (options.path) {
  case '/authorization_code':
    return cb(null, 'secret-for-azcode-adfasdfasdfasdfasdfasdfasdf');
  }
  
  return cb(new Error('No creds?'));
}


module.exports = FileCredentialManager;
