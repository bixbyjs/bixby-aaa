exports = module.exports = {
  'authenticatepassword': require('./authenticatepassword'),
  'authenticatetoken': require('./authenticatetoken')
};

exports.load = function(id) {
  try {
    return require('./' + id);
  } catch (ex) {
    if (ex.code == 'MODULE_NOT_FOUND') { return; }
    throw ex;
  }
};
