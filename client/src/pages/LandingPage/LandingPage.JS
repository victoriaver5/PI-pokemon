import './LandingPage.css';

import { Link } from 'react-router-dom';
import React from 'react';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="background-image">
        {/* Asegúrate de tener la ruta correcta para tu imagen de fondo */}
        <img src="client/src/img-pokemon/51d97c2f6a5e940bef86f36bb1f1ba0d.jpg" alt="fondo pokemon" />
      </div>
      <div className="welcome-message">
        <h1>Bienvenido a la Pokédex</h1>
        <p>Encuentra y explora el mundo de los Pokémon</p>
        {/* Redirige al usuario a la Home Page */}
        <Link to="/home">
          <button>Ingresar</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;

