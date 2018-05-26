var uri = require('url');
var decisions = require('decisions');


function FileCredentialsStore(file) {
  var settings = decisions.createSettings();
  settings.load(file);
  
  this._credentials = settings.toObject();
}

FileCredentialsStore.prototype.get = function(entity, options, cb) {
  if (typeof entity == 'string') {
    entity = { identifier: entity };
  }
  if (typeof options == 'function') {
    cb = options;
    options = undefined;
  }
  options = options || {};
  
  var creds = entity.id ? this._credentials[entity.id] : this._credentials[entity.identifier];
  if (!creds) {
    return cb(new Error('No credentials for: ' + entity.identifier || entity.id));
  }
  
  if (Array.isArray(creds)) {
    
  } else {
    return cb(null, creds);
  }
}


module.exports = FileCredentialsStore;
