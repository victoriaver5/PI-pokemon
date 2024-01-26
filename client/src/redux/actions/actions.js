// Importa las constantes directamente desde actionstypes.js

import * as ActionTypes from '../actionsTypes/actionsTypes';

import axios from 'axios';

export const addFav = (character) => {
  const endpoint = 'http://localhost:3001/pokemon/fav';
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, character);
      if (!data.length) throw Error('no hay favoritos');

      return dispatch({
        type: ActionTypes.ADD_FAV,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const removeFav = (id) => {
  const endpoint = `http://localhost:3001/pokemon/fav/${id}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(endpoint);

      return dispatch({
        type: ActionTypes.REMOVE_FAV,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
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
export const filterCards = (type) => {
  if (ActionTypes.POKEMON_TYPES.includes(type) || type === 'allPokemon') {
    return { type: ActionTypes.FILTER, payload: type };
  } else {
    console.error('Tipo de Pokémon no válido:', type);
    return { type: 'INVALID_TYPE', payload: type };
  }
};

export const filterCardsByGender = (gender) => {
  return { type: ActionTypes.FILTER, payload: gender };
};

export const orderCards = (order) => {
  return { type: ActionTypes.ORDER, payload: order };
};

// Nueva constante para obtener detalles de un Pokémon
export const getDetailPokemons = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/pokemons/${id}`);
      return dispatch({
        type: ActionTypes.GET_DETAIL_POKEMON,
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

// Nueva constante para limpiar los detalles de un Pokémon
export const cleanDetail = () => {
  return { type: ActionTypes.CLEAN_DETAIL };
};

// Nueva constante para limpiar información de filtros
export const cleanInfoFilters = () => {
  return { type: ActionTypes.CLEAN_INFO_FILTERS };
};
