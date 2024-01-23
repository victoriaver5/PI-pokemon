const { Router } = require('express');
const { Pokemon } = require('../db.js');
const axios = require('axios');
const { Op } = require('sequelize');

const router = Router();
let apiUrl = 'https://pokeapi.co/api/v2/pokemon';


// GET /pokemons
router.get('/', async (req, res) => {
  try {
    console.log('Entré a la ruta GET /pokemons');

    // Obtener todos los Pokémon de la base de datos
    const dbPokemons = await Pokemon.findAll();
    console.log('Pokémon de la base de datos:', dbPokemons);

    // Realizar la petición a la API
    const response = await axios.get(`${apiUrl}?limit=100`);
    const apiPokemons = response.data.results;
    console.log('Pokémon de la API:', apiPokemons);

    // Combinar Pokémon de la base de datos y Pokémon de la API
    const allPokemons = [...dbPokemons, ...apiPokemons];
    console.log('Todos los Pokémon:', allPokemons);

    res.json(allPokemons);
  } catch (error) {
    console.error('Error en GET /pokemons:', error);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});


// GET /pokemons/:idPokemon
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Intenta obtener el Pokémon de la base de datos por ID
    const dbPokemon = await Pokemon.findByPk(id);

    // Si el Pokémon no está en la base de datos, intenta obtenerlo de la API
    if (!dbPokemon) {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const apiPokemon = response.data;

      // Crea el Pokémon en la base de datos
      const createdPokemon = await Pokemon.create({
        nombre: apiPokemon.name,
        // Otros campos que quieras incluir
      });

      res.json(createdPokemon);
    } else {
      // Si el Pokémon está en la base de datos, envíalo como respuesta
      res.json(dbPokemon);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// GET /pokemons/name?="..."
router.get('/pokemons/name', async (req, res) => {
  try {
    const { name } = req.query;

    // Busca el Pokémon por nombre en la base de datos (ignorando mayúsculas/minúsculas)
    const dbPokemons = await Pokemon.findAll({
      where: {
        nombre: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });

    // Si no se encuentran en la base de datos, realiza la búsqueda en la API
    if (dbPokemons.length === 0) {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const apiPokemon = response.data;

      // Envía el Pokémon encontrado en la API como respuesta
      res.json(apiPokemon);
    } else {
      // Envía los Pokémon encontrados en la base de datos como respuesta
      res.json(dbPokemons);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// POST /pokemons
router.post('/pokemons', async (req, res) => {
  try {
    const { nombre, tipo1, tipo2 } = req.body;

    // Crea un nuevo Pokémon en la base de datos
    const newPokemon = await Pokemon.create({
      nombre,
      // Otras propiedades del Pokémon...
    });

    // Relaciona el Pokémon con los tipos indicados
    await newPokemon.setTypes([tipo1, tipo2]);

    res.json(newPokemon);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
