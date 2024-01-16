const { Router } = require('express');
const { Type } = require('../db.js');
const axios = require('axios');

const router = Router();

// GET /types
router.get('/types', async (req, res) => {
  try {
    // Lógica para obtener todos los tipos
    // Si la base de datos está vacía, obtén los tipos de la API y guárdalos en la base de datos
    // ...

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
