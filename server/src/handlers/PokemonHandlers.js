const PokemonController = require('../controllers/PokemonController');

const getAllPokemonsHandler = async (req, res) => {
  try {
    const result = await PokemonController.getAllPokemons();
    res.json(result);
  } catch (error) {
    console.error('Error en getAllPokemonsHandler:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getPokemonByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await PokemonController.getPokemonById(id);
    res.json(result);
  } catch (error) {
    console.error('Error en getPokemonByIdHandler:', error);
    res.status(error.message.includes('ID') ? 404 : 500).json({ error: error.message });
  }
};
const getPokemonByNameHandler = async (req, res) => {
  try {
    const { name } = req.params; // Cambiado de req.query a req.params
    console.log(`Buscando el Pokémon: ${name}`);
    const response = name ? await findByName(name) : await findAllPokemons();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ "error": error.message });
  }
};


const createPokemonHandler = async (req, res) => {
  try {
    const { name, image, life, attack, defense, speed, height, weight, types } = req.body;

    const result = await PokemonController.createPokemon({ name, image, life, attack, defense, speed, height, weight, types });
    res.status(200).json(result);
  } catch (error) {
    console.error('Error en createPokemonHandler:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


module.exports = {
  getAllPokemonsHandler,
  getPokemonByIdHandler,
  getPokemonByNameHandler,
  createPokemonHandler,
};
