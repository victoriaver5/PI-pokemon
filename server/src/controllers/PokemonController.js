const { Pokemon, } = require('../db');
const axios = require('axios');
const { Op } = require('sequelize');


let apiUrl = 'https://pokeapi.co/api/v2/pokemon';
const getAllPokemons = async (req, res) => {
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
};

const getPokemonById = async (req, res) => {
    try {
      const { id } = req.params;
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  
      if (!data.name) {
        throw new Error(`ID: ${id} not found`);
      }
  
      // Utiliza el ID proporcionado en la URL en lugar del proporcionado por la API
      const apiPokemonId = id;
  
      const pokemon = {
        id: apiPokemonId,
        name: data.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${apiPokemonId}.png`,
        life: data.stats.find(stat => stat.stat.name === "hp").base_stat,
        attack: data.stats.find(stat => stat.stat.name === "attack").base_stat,
        defense: data.stats.find(stat => stat.stat.name === "defense").base_stat,
        speed: data.stats.find(stat => stat.stat.name === "speed").base_stat,
        height: data.height,
        weight: data.weight,
      };
  
      return res.status(200).json(pokemon);
    } catch (error) {
      // Maneja el error y devuelve una respuesta adecuada
      return res.status(error.message.includes("ID") ? 404 : 500).json({ error: error.message });
    }
  };
  
    
  

module.exports = {
  getAllPokemons,
  getPokemonById,
  
};
