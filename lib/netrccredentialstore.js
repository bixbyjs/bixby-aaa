var netrc = require('netrc');


function NetrcCredentialStore() {
  this._creds = netrc();
}

NetrcCredentialStore.prototype.get = function(hostname, cb) {
  var self = this;
  process.nextTick(function() {
    var creds = self._creds[hostname];
  
    // TODO: Error?
    if (!creds) { return cb(null); }
    return cb(null, {
      username: creds.login,
      password: creds.password
    });
  });
}


module.exports = NetrcCredentialStore;
