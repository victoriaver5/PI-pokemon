const { Router } = require('express');
const { Pokemon, Type } = require('../db.js');
const axios = require('axios');

const router = Router();

// GET /pokemons
router.get('/pokemons', async (req, res) => {
  try {
    // Lógica para obtener todos los pokemons de la base de datos y de la API
    // Combina los resultados y envíalos como respuesta
    // ...

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// GET /pokemons/:idPokemon
router.get('/pokemons/:idPokemon', async (req, res) => {
  try {
    const { idPokemon } = req.params;
    // Lógica para obtener detalles de un pokemon por ID
    // ...

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// GET /pokemons/name?="..."
router.get('/pokemons/name', async (req, res) => {
  try {
    const { name } = req.query;
    // Lógica para buscar pokemons por nombre (ignorando mayúsculas/minúsculas)
    // ...

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// POST /pokemons
router.post('/pokemons', async (req, res) => {
  try {
    // Lógica para crear un nuevo pokemon en la base de datos
    // y relacionarlo con los tipos indicados
    // ...

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
