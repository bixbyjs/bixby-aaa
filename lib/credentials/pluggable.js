function PluggableCredentialStore() {
  this._stores = [];
}

PluggableCredentialStore.prototype.use = function(store) {
  this._stores.push(store);
}

PluggableCredentialStore.prototype.get = function(hostname, cb) {
  var self = this
    , i = 0, e;
  
  function next(err, result) {
    if (!err && result) { return cb(null, result); }
    
    e = e || err; // preserve first error
    
    var store = self._stores[i++];
    if (!store) {
      return cb(e || new Error('No credential found: ' + hostname));
    }
    store.get(hostname, next);
  }
  next();
}

module.exports = PluggableCredentialStore;
