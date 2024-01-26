// TypesController.js
const { TypesPokemon } = require('../db');
const axios = require('axios');

const getAllTypes = async (req, res) => {
  try {
    // Verifica si hay tipos en la base de datos
    const allTypesInDB = await TypesPokemon.findAll();

    if (allTypesInDB.length === 0) {
      // Si la base de datos está vacía, obtén tipos desde la API
      const apiResponse = await axios.get('https://pokeapi.co/api/v2/type/');
      const apiTypes = apiResponse.data.results;

      // Guarda los tipos en la base de datos
      await Promise.all(
        apiTypes.map(async (apiType) => {
          await TypesPokemon.create({ name: apiType.name });
        })
      );
    }

    // Obtén todos los tipos desde la base de datos
    const allTypesFromDB = await TypesPokemon.findAll();
    
    // Si se proporciona un nombre, filtra los tipos por ese nombre
    const { name } = req.query;
    if (name) {
      const filteredTypes = allTypesFromDB.filter((type) =>
        type.name.toLowerCase().includes(name.toLowerCase())
      );
      return res.json(filteredTypes.map((type) => type.name));
    }

    // Si no se proporciona un nombre, devuélvelos todos
    const typeNames = allTypesFromDB.map((type) => type.name);
    return res.json(typeNames);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getAllTypes,
};


