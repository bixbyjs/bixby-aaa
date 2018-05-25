var uri = require('url');
var decisions = require('decisions');


function FileCredentialsStore(file) {
  var settings = decisions.createSettings();
  settings.load(file);
  
  this._credentials = settings.toObject().credentials;
  console.log(this._credentials);
}

FileCredentialsStore.prototype.get = function(options, cb) {
  console.log('GET CREDENTIALS!!!');
  console.log(options);
  //return;
  
  if (options.url) {
    var url = uri.parse(options.url);
    
    options.scheme = url.protocol.slice(0, -1); // remove trailing colon
    options.authority = url.host;
    options.path = url.path;
  }
  
  var creds = this._credentials
    , cred, i, len;
  for (i = 0, len = creds.length; i < len; ++i) {
    cred = creds[i];
    
    if (options.id && options.id == cred.id) {
      console.log('RETURN THE PASSWORD!');
      return cb(null, cred.password);
    }
    
    if (options.path) {
      if (options.authority != cred.authority) { continue; }
      if (options.path != cred.path) { continue; }
      return cb(null, cred.password);
    }
  }
  
  return cb(new Error('No creds for: ' + options.authority));
}


module.exports = FileCredentialsStore;
