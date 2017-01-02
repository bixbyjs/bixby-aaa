exports = module.exports = {
  'authenticatepassword': require('./xom/authenticatepassword'),
  'authenticatetoken': require('./xom/authenticatetoken')
};

exports.load = function(id) {
  try {
    return require('./' + id);
  } catch (ex) {
    if (ex.code == 'MODULE_NOT_FOUND') { return; }
    throw ex;
  }
};
