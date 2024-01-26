import './PokeCardList.css'; // Asegúrate de importar el archivo CSS correctamente

import { cleanInfoFilters, filterPokemons, filterTypesPokemons, getAllPokemons, orderPokemons } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

import Card from '../Card/Card';
import React from 'react'; // Asegúrate de importar React si estás utilizando componentes de React

const PokeCardList = () => {
  const dispatch = useDispatch(); // Agrega la declaración de dispatch
  const pokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.types);
  const filters = useSelector((state) => state.filterInfo);

  const handleFiltersTypes = (event) => {
    dispatch(filterTypesPokemons(event.target.value));
  };

  const handleFilters = (event) => {
    dispatch(filterPokemons(event.target.value));
  };

  const handleSort = (event) => {
    dispatch(orderPokemons(event.target.value));
  };

  const showAllPokemons = () => {
    dispatch(cleanInfoFilters());
    dispatch(getAllPokemons());
  };

  const viewPokemons = pokemons; // Supongo que tu vistaPokemons es igual a tu lista de pokémons, ajusta según sea necesario

  return (
    <div>
      <div className="your-class-name"> {/* Agrega una clase CSS correcta */}
        <img alt="img" src="https://25.media.tumblr.com/a1e87d2030a73aee16661e8807da6c1d/tumblr_mkhnmmFwaA1rxvkeso1_500.gif" />

        <select className="your-class-name" onChange={handleSort}>
          <option value="All" hidden>
            Orden
          </option>
          <option value="Ascendente">A-Z</option>
          <option value="Descendente">Z-A</option>
        </select>

        <select className="your-class-name" onChange={handleFiltersTypes}>
          <option value="All" hidden>
            Types
          </option>
          <option value="All">All</option>
          {types.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name.charAt(0).toUpperCase() + type.name.substring(1)}
            </option>
          ))}
        </select>

        <select className="your-class-name" onChange={handleFilters}>
          <option value="All" hidden>
            Storage
          </option>
          <option value="AllPokemons">All Pokemons</option>
          <option value="Stored">Exist</option>
          <option value="Created">Create</option>
        </select>
        <button className="your-class-name" onClick={showAllPokemons}>
          Show all Pokemons
        </button>
      </div>
      <br />
      <div className="your-class-name">
        {viewPokemons.length !== 0 ? (
          viewPokemons.map((pokemon) => (
            <Card key={pokemon.id} id={pokemon.id} name={pokemon.name} image={pokemon.image} types={pokemon.types} />
          ))
        ) : viewPokemons.length === 0 && filters.event === 0 ? (
          <div>
            <h2>There are no video games with those filters applied.</h2>
          </div>
        ) : (
          <div>
            <h2>Loading...</h2>
          </div>
        )}
        <br />
      </div>
    </div>
  );
};

export default PokeCardList;
