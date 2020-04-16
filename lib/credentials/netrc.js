var netrc = require('netrc');


function NetrcCredentialStore() {
  this._credentials = netrc();
}

NetrcCredentialStore.prototype.get = function(hostname, cb) {
  var self = this;
  process.nextTick(function() {
    var credential = self._credentials[hostname];
  
    // TODO: Error?
    if (!credential) { return cb(null); }
    return cb(null, {
      username: credential.login,
      password: credential.password
    });
  });
}

module.exports = NetrcCredentialStore;
