const { Pokemon, TypesPokemon } = require('../db');
const axios = require('axios');


let apiUrl = 'https://pokeapi.co/api/v2/pokemon';

const getAllPokemons = async () => {
  try {
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

    return { pokemons: allPokemons };
  } catch (error) {
    console.error('Error en getAllPokemons:', error);
    throw new Error('Error interno del servidor');
  }
};

const getPokemonById = async (id) => {
  try {
    const { data } = await axios.get(`${apiUrl}/${id}`);

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

    return { pokemon: pokemon };
  } catch (error) {
    console.error('Error en getPokemonById:', error);
    throw new Error(error.message.includes('ID') ? `ID: ${id} not found` : 'Error interno del servidor');
  }
};

const getPokemonByName = async (name) => {
  try {
    // Buscar en la base de datos por nombre
    const dbPokemon = await Pokemon.findOne({
      where: { name: name }
    });

    if (dbPokemon) {
      return { pokemon: dbPokemon };
    }

    // Si no está en la base de datos, buscar en la API
    const { data } = await axios.get(`${apiUrl}/pokemon/${name}`);
    ;

    const apiPokemon = {
      id: data.id,
      name: data.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
      life: data.stats.find(stat => stat.stat.name === "hp").base_stat,
      attack: data.stats.find(stat => stat.stat.name === "attack").base_stat,
      defense: data.stats.find(stat => stat.stat.name === "defense").base_stat,
      speed: data.stats.find(stat => stat.stat.name === "speed").base_stat,
      height: data.height,
      weight: data.weight,
    };

    return { pokemon: apiPokemon };
  } catch (error) {
    console.error('Error en getPokemonByName:', error);
    throw new Error(`Error en getPokemonByName: ${error.message}`);
  }
};

const createPokemon = async (pokemonData) => {
  try {
    const newPokemon = await Pokemon.create({
      name: pokemonData.name,
      image: pokemonData.image,
      life: pokemonData.life,
      attack: pokemonData.attack,
      defense: pokemonData.defense,
      speed: pokemonData.speed,
      height: pokemonData.height,
      weight: pokemonData.weight,
    });

    const pokemonTypes = [];

    // Asocia los tipos al nuevo Pokémon
    for (const type of pokemonData.types) {
      try {
        const typeInfo = await axios.get(type.url);
        const typeName = typeInfo.data.name.toLowerCase();

        // Busca el tipo en la base de datos
        let existingType = await TypesPokemon.findOne({
          where: { name: typeName },
        });

        // Si el tipo no existe, créalo y luego asígneselo al Pokémon
        if (!existingType) {
          existingType = await TypesPokemon.create({ name: typeName });
        }

        // Verifica si ya está asociado al Pokémon antes de agregarlo
        const isAssociated = await newPokemon.hasTypesPokemon(existingType);

        // Si no está asociado, agrégalo
        if (!isAssociated) {
          await newPokemon.addTypesPokemon(existingType);
          pokemonTypes.push(existingType.name); // Agrega el nombre del tipo al array
        }
      } catch (error) {
        console.error(`Error al obtener información del tipo ${type.url}:`, error.message);
      }
    }

    // Añade los tipos al objeto de respuesta
    newPokemon.dataValues.types = pokemonTypes;

    return newPokemon;
  } catch (error) {
    console.error('Error en createPokemon:', error);
    throw new Error(`Error en createPokemon: ${error.message}`);
  }
};





module.exports = {
  getAllPokemons,
  getPokemonById,
  getPokemonByName,
  createPokemon,
};
