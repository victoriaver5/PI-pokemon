const { Router } = require('express');
const pokemonsRouter = require('./RoutePokemons'); // Importa el router de pokemons
const typesPokemonRouter = require('./RouteTypesPokemon'); // Importa el router de types

const router = Router();

// Configurar los routers
router.use('/typesPokemon', typesPokemonRouter); // Configura el router de types en la ruta /types
router.use('/pokemons', pokemonsRouter); // Configura el router de pokemons en la ruta /pokemons

module.exports = router;

