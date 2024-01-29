import './LandingPage.css';

import { Link } from 'react-router-dom';
import React from 'react';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="background-image">
        <img src="51d97c2f6a5e940bef86f36bb1f1ba0d.jpg" alt="fondo pokemon" />
      </div>
      <div className="welcome-message">
        <h1>Bienvenido a la Pokédex</h1>
        <p>Encuentra y explora el mundo de los Pokémon</p>
  
        <Link to="/home">
          <button>Ingresar</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;

