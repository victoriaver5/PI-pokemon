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
  
      // Intenta obtener todos los tipos de la base de datos
      const dbTypes = await TypesPokemon.findAll();
  
      // Si la base de datos está vacía, obtener los tipos de la API
      if (dbTypes.length === 0) {
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        const apiTypes = response.data.results;
  
        // Guarda los tipos de la API en la base de datos
        await TypesPokemon.bulkCreate(apiTypes.map((apiType) => ({ name: apiType.name })));
  
        // Vuelve a obtener los tipos de la base de datos
        const updatedDbTypes = await TypesPokemon.findAll();
  
        // Envía solo los nombres de los tipos como respuesta
        res.json(updatedDbTypes.map(dbType => ({ name: dbType.name })));
      } else {
        // Envía solo los nombres de los tipos de la base de datos como respuesta
        res.json(dbTypes.map(dbType => ({ name: dbType.name })));
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  

module.exports = {
  getAllTypes,
};


