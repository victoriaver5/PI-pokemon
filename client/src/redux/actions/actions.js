// Importa las constantes directamente desde actionstypes.js

import * as ActionTypes from '../actionsTypes/actionsTypes';

import axios from 'axios';

export const getAllPokemons = (page = 1, type = 'All', order = 'All') => {
  return async function (dispatch) {
    try {
      let apiUrl = `http://localhost:3001/pokemons/?page=${page}&type=${type}&order=${order}`;
      const response = await axios.get(apiUrl);

      return dispatch({
        type: ActionTypes.GET_ALL_POKEMONS,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: ActionTypes.ERROR,
        payload: error.message || 'Hubo un error al obtener los Pokémon.',
      });
    }
  };
};

export const getPokemonByName = (name) => {
  const endpoint = `http://localhost:3001/pokemon/${name}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);

      return dispatch({
        type: ActionTypes.GET_POKE_BY_NAME,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

// Corrección en la acción FILTER
export const filterPokemons = (storage) => {
  if (["AllPokemons", "Stored", "Created"].includes(storage)) {
    return { type: ActionTypes.FILTER, payload: storage };
  } else {
    console.error('Tipo de almacenamiento no válido:', storage);
    return { type: ActionTypes.ERROR, payload: 'Tipo de almacenamiento no válido' };
  }
};

export const getTypes = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get('http://localhost:3001/types');
      return dispatch({
        type: ActionTypes.GET_TYPES,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: ActionTypes.ERROR,
        payload: error,
      });
    }
  };
};

export const filterTypesPokemons = (type) => {
  console.log('Tipo recibido:', type);
  if (ActionTypes.POKEMON_TYPES.includes(type) || type === 'allPokemon') {
    return { type: ActionTypes.FILTER_TYPES, payload: type };
  } else {
    console.error('Tipo de Pokémon no válido:', type);
    return { type: 'INVALID_TYPE', payload: type };
  }
};

export const orderPokemons = (order) => {
  return { type: ActionTypes.ORDER, payload: order };
};

// Nueva constante para obtener detalles de un Pokémon
export const getDetailPokemons = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/pokemon/${id}`);
      return dispatch({
        type: ActionTypes.GET_DETAIL_POKEMON,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: ActionTypes.ERROR,
      });
    }
  };
};

// Nueva constante para crear un nuevo Pokémon
export const createNewPokemon = (pokemonData) => async (dispatch) => {
  try {
    // Realizar la solicitud al backend para crear un nuevo Pokémon
    const response = await axios.post('http://localhost:3001/pokemons', pokemonData);

    // Dispatch de la acción en caso de éxito
    dispatch({
      type: ActionTypes.CREATE_POKEMON_SUCCESS,
      payload: response.data,  // Puedes ajustar esto según la estructura de respuesta de tu backend
    });
  } catch (error) {
    console.error('Error al crear el Pokémon:', error.message);

    // Dispatch de la acción en caso de error
    dispatch({
      type: ActionTypes.CREATE_POKEMON_FAILURE,
      payload: error.message,
    });
  }
};

// Nueva constante para limpiar los detalles de un Pokémon
export const cleanDetail = () => {
  return { type: ActionTypes.CLEAN_DETAIL };
};

// Nueva constante para limpiar información de filtros
export const cleanInfoFilters = () => {
  return { type: ActionTypes.CLEAN_INFO_FILTERS };
};
