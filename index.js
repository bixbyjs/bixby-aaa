exports = module.exports = {
  'verifypassword': require('./xom/verifypassword'),
  // TODO: Move these files
  //'bearer': require('./bearer'),
  //'oauth': require('./oauth')
};

exports.load = function(id) {
  try {
    return require('./' + id);
  } catch (ex) {
    if (ex.code == 'MODULE_NOT_FOUND') { return; }
    throw ex;
  }
};
