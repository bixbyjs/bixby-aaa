function EnvCredentialStore() {
}

EnvCredentialStore.prototype.get = function(hostname, cb) {
  if (typeof hostname == 'function') {
    cb = hostname;
    hostname = undefined;
  }
  
  if (hostname) { return cb(null); }
  
  var self = this;
  process.nextTick(function() {
    // TODO: is there a naming convention for this?
    var secret = process.env['SECRET'];
  
    // TODO: Error?
    if (!secret) { return cb(null); }
    return cb(null, {
      secret: secret
    });
  });
}

module.exports = EnvCredentialStore;
