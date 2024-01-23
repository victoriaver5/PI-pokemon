

const URL = "https://pokeapi.co/api/v2/pokemon/{id}";
const axios = require("axios");

const getPokemonById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios(`${URL.replace("{id}", id)}`);

    if (!data.name) {
      throw new Error(`ID: ${id} not found`);
    }

    const pokemon = {
      id: data.id,
      nombre: data.name,
      imagen: data.imagen,
      vida: data.vida,
      ataque: data.ataque,
      defensa: data.defensa,
      velocidad: data.velocidad,
      altura: data.altura,
      peso: data.peso,
    };

    return res.status(200).json(pokemon);
  } catch (error) {
    return res.status(error.message.includes("id") ? 404 : 500).send(error.message);
  }
};

module.exports = {
  getPokemonById
};
