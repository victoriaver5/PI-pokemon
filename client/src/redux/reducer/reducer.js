import {
  CLEAN_DETAIL,
  CLEAN_INFO_FILTERS,
  CREATE_POKEMON_FAILURE,
  CREATE_POKEMON_SUCCESS,
  ERROR,
  FILTER,
  FILTER_TYPES,
  GET_ALL_POKEMONS,
  GET_DETAIL_POKEMON,
  GET_POKE_BY_NAME,
  GET_TYPES,
  ORDER,
} from "../actionsTypes/actionsTypes";

const initialState = {
  allPokemon: [],
  types: [],
  detailPokemon: null,
  infoFilters: null,
  error: null,
  createdPokemon: null, 
  createPokemonError: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        allPokemon: Array.isArray(payload) ? payload : [],
      };

      case GET_POKE_BY_NAME:
        return {
          ...state,
          detailPokemon: payload,
        };

        case FILTER:
          const allPokemonFiltered = state.allPokemon.filter(pokemon =>
            payload === "AllPokemons" ? true : pokemon.storage === payload
          );
          return { ...state, allPokemon: allPokemonFiltered };
        

    case GET_TYPES:
      return {
        ...state,
        types: payload,
      };

      case FILTER_TYPES:
        const allPokemonFilteredByType = state.allPokemon.filter(pokemon =>
          payload === "allPokemon" ? true : pokemon.types.includes(payload)
        );
        return { ...state, allPokemon: allPokemonFilteredByType };

    case ORDER:
      const pokemonsCopy = [...state.allPokemon];
      const sortedPokemons = payload === 'Descendente'
        ? pokemonsCopy.sort((a, b) => a.name.localeCompare(b.name))
        : payload === 'Ascendente'
          ? pokemonsCopy.sort((a, b) => b.name.localeCompare(a.name))
          : pokemonsCopy;

      return {
        ...state,
        allPokemon: sortedPokemons,
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
      case CREATE_POKEMON_SUCCESS:
        return {
          ...state,
          createdPokemon: payload,
          createPokemonError: null,
        };
  
      case CREATE_POKEMON_FAILURE:
        return {
          ...state,
          createdPokemon: null,
          createPokemonError: payload,
        };

    default:
      return state;
  }
};

export default reducer;
