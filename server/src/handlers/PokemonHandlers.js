const PokemonController = require('../controllers/PokemonController');

const getAllPokemonsHandler = async (req, res) => {
  await PokemonController.getAllPokemons(req, res);
};

const getPokemonByIdHandler = async (req, res) => {
  await PokemonController.getPokemonById(req, res);
};




module.exports = {
  getAllPokemonsHandler,
  getPokemonByIdHandler,

};
