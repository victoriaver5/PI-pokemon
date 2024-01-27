import './PokeCardList.css'; // Asegúrate de importar el archivo CSS correctamente

import { cleanInfoFilters, filterPokemons, filterTypesPokemons, getAllPokemons, orderPokemons } from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';

import PokeCard from '../PokeCard/PokeCard';
import React from 'react'; // Asegúrate de importar React si estás utilizando componentes de React

const PokeCardList = () => {
  const dispatch = useDispatch(); // Agrega la declaración de dispatch
  const pokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.types);
 // const filters = useSelector((state) => state.filterInfo);

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

      <div>
        {/* Aquí deberías mapear tus pokemons y renderizar los componentes Card */}
        {pokemons.map((pokemon) => (
          <PokeCard key={pokemon.id} {...pokemon} />
        ))}
      </div>
    </div>
  );
};

export default PokeCardList;

