import './LandingPage.css';

import { Link } from 'react-router-dom';
import React from 'react';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="background-image">
        <img src="https://www.lavanguardia.com/andro4all/hero/2019/02/Fondos-de-pantalla-de-Pokemon.jpg?width=1200" alt="fondo pokemon" />
      </div>
      <div className="welcome-message">
        <div className="welcome-text">
          <h1>Bienvenido a la Pokédex</h1>
        </div>
        <Link to="/home">
          <button className='ingresar-button'>Ingresar</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;

