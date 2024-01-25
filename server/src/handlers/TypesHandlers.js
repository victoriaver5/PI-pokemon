// TypesHandlers.js
const TypesController = require('../controllers/TypesController');

const getAllTypesHandler = async (req, res) => {
  await TypesController.getAllTypes(req, res);
};

module.exports = {
  getAllTypesHandler,
};
