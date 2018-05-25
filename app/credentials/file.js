exports = module.exports = function() {
  var uri = require('url')
    , FileCredentialsStore = require('../../lib/filecredentialmanager');
  
  
  return function createFileCredentialsStore(options) {
    if (typeof options == 'string') {
      options = { url: options };
    }
    
    var url = uri.parse(options.url);
    if (url.protocol !== 'file:') { return; }
    return new FileCredentialsStore(url.pathname);
  };
};
