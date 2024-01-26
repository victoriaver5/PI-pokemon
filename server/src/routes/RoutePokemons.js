const { Router } = require('express');
const PokemonHandlers = require('../handlers/PokemonHandlers');

const router = Router();

router.get('/', PokemonHandlers.getAllPokemonsHandler);
router.get('/:id', PokemonHandlers.getPokemonByIdHandler);
router.get('/name/:name', PokemonHandlers.getPokemonByNameHandler);
router.post('/', PokemonHandlers.createPokemonHandler);

module.exports = router;
