import { cleanDetail, getDetailPokemons } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemonDetails);

  useEffect(() => {
    dispatch(cleanDetail());
    dispatch(getDetailPokemons(id));
  }, [dispatch, id]);

  return (
    <div className="detail-container">
      {!Array.isArray(pokemon) || pokemon.length === 0 ? (
        <div>
          <h2>Error: No se pudo cargar la información del Pokémon.</h2>
        </div>
      ) : (
        <>
          <div className="pokemon-info">
            <h2>Pokemon Information</h2>
            <h3>{pokemon[0].name.toUpperCase()}</h3>
            <img src={pokemon[0].image} alt="not found" />
          </div>
          <div className="pokemon-stats">
            <form>
              {/* Resto del formulario */}
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
