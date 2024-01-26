import { ADD_FAV, FILTER, GET_POKE_BY_NAME, ORDER, REMOVE_FAV } from "../actionsTypes/actionsTypes";

const initialState = {
  myFavorites: [],
  allPokemon: [],
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_FAV:
      return {
        ...state,
        myFavorites: payload,
        allPokemon: payload,
      };

    case REMOVE_FAV:
      return {
        ...state,
        myFavorites: payload,
        allPokemon: payload,
      };

      case GET_POKE_BY_NAME:
  return {
    ...state,
    myFavorites: [payload], // Puedes ajustar según sea necesario
    allPokemon: [payload], // Puedes ajustar según sea necesario
  };

    case FILTER:
      const allPokemonFiltered = state.allPokemon.filter(pokemon =>
        payload === "allPokemon" ? true : pokemon.type === payload
      );
      return { ...state, myFavorites: allPokemonFiltered };

    case ORDER:
      const myFavoritesCopy = [...state.myFavorites];
      return {
        ...state,
        myFavorites: payload === "A"
          ? myFavoritesCopy.sort((a, b) => a.name.localeCompare(b.name))
          : myFavoritesCopy.sort((a, b) => b.name.localeCompare(a.name))
      }

    default:
      return { ...state };
  }
}

export default reducer;
