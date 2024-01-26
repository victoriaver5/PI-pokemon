const { TypesPokemon } = require('../db');
const axios = require('axios');

const getAllTypes = async (req, res) => {
  try {
    const { name } = req.query;

    // Si se especifica un nombre, intenta obtener el tipo desde la API
    if (name) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${name.toLowerCase()}`);
        const apiType = response.data;

        // Si se encuentra en la API, enviar solo el nombre como respuesta
        return res.json({ name: apiType.name });
      } catch (apiError) {
        // Si no se encuentra en la API, continúa buscando en la base de datos
      }
    }

    // Verifica si se proporciona un nombre antes de buscar en la base de datos
    if (name) {
      const dbType = await TypesPokemon.findOne({ where: { name } });

      if (dbType) {
        // Si se encuentra en la base de datos, enviar solo el nombre como respuesta
        return res.json({ name: dbType.name });
      } else {
        // Si no se encuentra en la base de datos, crea el tipo
        const createdType = await TypesPokemon.create({ name });
        return res.json({ name: createdType.name });
      }
    }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  

module.exports = {
  getAllTypes,
};


