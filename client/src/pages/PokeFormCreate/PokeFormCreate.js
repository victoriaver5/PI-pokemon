import './PokeFormCreate.css';

import React, { useEffect, useState } from 'react';
import { createPokemon, getTypes } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

import validation from './validation';

const PokeFormCreate = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const allPokemons = useSelector((state) => state.pokemons);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const [form, setForm] = useState({
    name: '',
    image: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    typeOne: '',
    typeTwo: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    image: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    typeOne: '',
    typeTwo: '',
  });

  const handleChange = (event, prop) => {
    const value = event.target.value;

    setErrors(validation({ ...form, [prop]: value }, allPokemons));
    setForm({ ...form, [prop]: value });
  };

  const handleTypeChange = (event, type) => {
    setForm({ ...form, [type]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createPokemon(form));
  };

  return (
    <div className="poke-form-create">
      <div className="form-container">
        <h2>Create Pokemon</h2>
        <img src={form.image} alt="Pokemon" />

        <form onSubmit={handleSubmit}>
          {/* Resto de los campos de entrada utilizando handleChange */}
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" value={form.name} onChange={(e) => handleChange(e, 'name')} />

          {/* Otros campos de entrada utilizando handleChange */}
          
          {/* Selector para el tipo uno */}
          <div>
            <label htmlFor="typeOne">Type One:</label>
            <select onChange={(e) => handleTypeChange(e, 'typeOne')} name="typeOne">
              <option value="All">Select</option>
              {types.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Selector para el tipo dos */}
          <div>
            <label htmlFor="typeTwo">Type Two:</label>
            <select onChange={(e) => handleTypeChange(e, 'typeTwo')} name="typeTwo">
              <option value="All">Select</option>
              {types.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Botón de envío */}
          <div>
            {errors.flag === true ? (
              <button disabled>Create Pokemon</button>
            ) : (
              <button type="submit">Create Pokemon</button>
            )}
          </div>
        </form>
      </div>

      {/* Validación de errores */}
      <div className="error-validation">
        <ul>
          {/* Listado de mensajes de error */}
        </ul>
      </div>
    </div>
  );
};

export default PokeFormCreate;
