import "./PokeFormCreate.css"

import React, { useEffect, useState } from 'react';
import { createNewPokemon, getTypes } from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';

const PokeFormCreate = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createNewPokemon(form));
  };

  return (
    <div className="poke-form-create">
      <div className="form-container">
        <h2>Create Pokemon</h2>
        <img src={form.image} alt="Pokemon" />

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" value={form.name} onChange={handleInputChange} />
          </div>

          <div>
            <label htmlFor="image">Image URL:</label>
            <input type="text" name="image" value={form.image} onChange={handleInputChange} />
          </div>

          <div>
            <label htmlFor="hp">Life:</label>
            <input type="text" name="hp" value={form.hp} onChange={handleInputChange} />
          </div>

          <div>
            <label htmlFor="attack">Attack:</label>
            <input type="text" name="attack" value={form.attack} onChange={handleInputChange} />
          </div>

          <div>
            <label htmlFor="defense">Defense:</label>
            <input type="text" name="defense" value={form.defense} onChange={handleInputChange} />
          </div>

          <div>
            <label htmlFor="speed">Speed:</label>
            <input type="text" name="speed" value={form.speed} onChange={handleInputChange} />
          </div>

          <div>
            <label htmlFor="height">Height:</label>
            <input type="text" name="height" value={form.height} onChange={handleInputChange} />
          </div>

          <div>
            <label htmlFor="weight">Weight:</label>
            <input type="text" name="weight" value={form.weight} onChange={handleInputChange} />
          </div>

          <div>
            <label htmlFor="typeOne">Type One:</label>
            <select
              className="types"
              name="typeOne"
              value={form.typeOne}
              onChange={handleInputChange}
            >
              <option value="" hidden>
                Select Type
              </option>
              {types.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name ? type.name.charAt(0).toUpperCase() + type.name.substring(1) : ''}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="typetwo">Type two:</label>
            <select
              className="types"
              name="typetwo"
              value={form.typetwo}
              onChange={handleInputChange}
            >
              <option value="" hidden>
                Select Type
              </option>
              {types.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name ? type.name.charAt(0).toUpperCase() + type.name.substring(1) : ''}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button type="submit" disabled={!form.name || !form.typeOne || !form.typeTwo}>
              Create Pokemon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PokeFormCreate;
