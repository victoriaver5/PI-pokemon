import "./PokeCardList.css"; // Asegúrate de importar tu archivo CSS

import React, { useState } from "react";
import {
  cleanInfoFilters,
  filterPokemons,
  filterTypesPokemons,
  getAllPokemons,
  orderPokemons,
} from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";

import Paginado from "../paginador/paginador";
import PokeCard from "../../components/PokeCard/PokeCard";
import { useNavigate } from "react-router-dom";

const PokeCardList = () => {
  const pokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.types);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const viewPage = 12;
  const lastPage = page * viewPage;
  const firstPage = lastPage - viewPage;
  const viewPokemons = pokemons ? pokemons.slice(firstPage, lastPage) : [];
  const dispatch = useDispatch();

  const paginado = (pageNum) => {
    setPage(pageNum);
  };

  const handleFiltersTypes = (event) => {
    const selectedType = event.target.value;

    if (selectedType === "All") {
      dispatch(filterTypesPokemons("All"));
    } else {
      dispatch(filterTypesPokemons(selectedType));
    }

    setPage(1);
    navigate('/home');
  };

  const handleFilters = (event) => {
    dispatch(filterPokemons(event.target.value));
    setPage(1);
    navigate('/home');
  };

  const handleSort = (event) => {
    dispatch(orderPokemons(event.target.value));
    setPage(1);
    navigate('/home');
  };

  const showAllPokemons = () => {
    dispatch(cleanInfoFilters());
    dispatch(getAllPokemons());
  };

  return (
    <div className="poke-card-list-container">
      <div className="filtersContainer">
        <img
          alt="gif pokemon"
          src="https://25.media.tumblr.com/a1e87d2030a73aee16661e8807da6c1d/tumblr_mkhnmmFwaA1rxvkeso1_500.gif"
        />

        <select className="orderFilter" onChange={handleSort}>
          <option value="All" hidden>
            Orden
          </option>
          <option value="Ascendente">A-Z</option>
          <option value="Descendente">Z-A</option>
        </select>

        <select className="typesFilter" onChange={handleFiltersTypes}>
          <option value="All" hidden>
            Types
          </option>
          <option value="All">All</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name ? type.name.charAt(0).toUpperCase() + type.name.substring(1) : ''}
            </option>
          ))}
        </select>

        <select className="storageFilter" onChange={handleFilters}>
          <option value="All" hidden>
            Storage
          </option>
          <option value="AllPokemons">All Pokemons</option>
          <option value="Stored">Exist</option>
          <option value="Created">Create</option>
        </select>
        <button className="poke-card-list-button" onClick={showAllPokemons}>
          Show all Pokemons
        </button>
      </div>
      <br />

      <div className="pokemonsContainer">
        <Paginado
          className="paginado"
          viewPage={viewPage}
          pokemons={pokemons ? pokemons.length : 0}
          paginado={paginado}
          page={page}
        />
        <br />
        <div className="cardContainer">
          {viewPokemons.length === 0 ? (
            <div>
              <h2>No hay Pokémon para mostrar.</h2>
            </div>
          ) : (
            viewPokemons.map((pokemon) => (
              <PokeCard
                key={pokemon.name}
                name={pokemon.name}
                image={pokemon.image}
                types={pokemon.types}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PokeCardList;
