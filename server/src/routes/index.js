const { Router } = require('express');
const pokemonsRouter = require('./RoutePokemons'); // Importa el router de pokemons
const typesPokemonRouter = require('./RouteTypesPokemon'); // Importa el router de types

const router = Router();

// Configurar los routers
router.use('/pokemons', pokemonsRouter); // Configura el router de pokemons en la ruta /pokemons
router.use('/types', typesPokemonRouter);

module.exports = router;

