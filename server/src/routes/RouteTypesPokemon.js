const { Router } = require('express');
const { TypesPokemon } = require('../db.js');
const axios = require('axios');

const router = Router();

// GET /types
router.get('/typesPokemon', async (req, res) => {
  try {
    // Intenta obtener todos los tipos de la base de datos
    const dbTypes = await TypesPokemon.findAll(); // <-- Corregido aquí

    // Si la base de datos está vacía, obtén los tipos de la API
    if (dbTypes.length === 0) {
      const response = await axios.get('https://pokeapi.co/api/v2/type');
      const apiTypes = response.data.results;

      // Guarda los tipos de la API en la base de datos
      await TypesPokemon.bulkCreate(apiTypes.map((apiType) => ({ nombre: apiType.name })));

      // Vuelve a obtener los tipos de la base de datos
      const updatedDbTypes = await TypesPokemon.findAll(); // <-- Corregido aquí

      // Envía los tipos como respuesta
      res.json(updatedDbTypes);
    } else {
      // Envía los tipos de la base de datos como respuesta
      res.json(dbTypes);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;


