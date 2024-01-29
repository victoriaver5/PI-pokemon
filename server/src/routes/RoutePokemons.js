const { Router } = require('express');
const PokemonHandlers = require('../handlers/PokemonHandlers');
const router = Router();

router.get('/', PokemonHandlers.getAllPokemonsHandler);
router.get('/name', PokemonHandlers.getPokemonByNameHandler);
router.get('/:id', PokemonHandlers.getPokemonByIdHandler);
router.post('/', PokemonHandlers.createPokemonHandler);

module.exports = router;
