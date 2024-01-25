// typeRoutes.js
const express = require('express');
const TypesHandlers = require('../handlers/TypesHandlers');

const router = express.Router();

// Configura la ruta para obtener todos los tipos
router.get('/', TypesHandlers.getAllTypesHandler);

module.exports = router;

