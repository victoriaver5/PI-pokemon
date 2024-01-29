import {
  ADD_FAV,
  CLEAN_DETAIL,
  CLEAN_INFO_FILTERS,
  ERROR,
  FILTER,
  FILTER_TYPES,
  GET_ALL_POKEMONS,
  GET_DETAIL_POKEMON,
  GET_POKE_BY_NAME,
  GET_TYPES,
  ORDER,
  REMOVE_FAV
} from "../actionsTypes/actionsTypes";

// Corregido el nombre del archivo de importación

const initialState = {
  myFavorites: [],
  allPokemon: [],
  types: [], // Agregada la propiedad para almacenar tipos de Pokémon
  detailPokemon: null, // Agregada la propiedad para detalles de Pokémon
  infoFilters: null, // Agregada la propiedad para información de filtros
  error: null, // Agregada la propiedad para manejar errores
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        allPokemon: payload,
      };

    case ADD_FAV:
    case REMOVE_FAV:
    case GET_POKE_BY_NAME:
      return {
        ...state,
        myFavorites: payload,
        allPokemon: payload,
      };

    case FILTER:
      const allPokemonFiltered = state.allPokemon.filter(pokemon =>
        payload === "allPokemon" ? true : pokemon.type === payload
      );
      return { ...state, myFavorites: allPokemonFiltered };

    case GET_TYPES:
      return {
        ...state,
        types: payload,
      };

    case FILTER_TYPES:
      const allPokemonFilteredByType = state.allPokemon.filter(pokemon =>
        payload === "allPokemon" ? true : pokemon.type === payload
      );
      return { ...state, myFavorites: allPokemonFilteredByType };

    case ORDER:
      const myFavoritesCopy = [...state.myFavorites];
      return {
        ...state,
        myFavorites: payload === "A"
          ? myFavoritesCopy.sort((a, b) => a.name.localeCompare(b.name))
          : myFavoritesCopy.sort((a, b) => b.name.localeCompare(a.name))
      };

    case GET_DETAIL_POKEMON:
      return {
        ...state,
        detailPokemon: payload,
      };

    case CLEAN_DETAIL:
      return {
        ...state,
        detailPokemon: null,
      };

    case CLEAN_INFO_FILTERS:
      return {
        ...state,
        infoFilters: null,
      };

    case ERROR:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};

export default reducer;
