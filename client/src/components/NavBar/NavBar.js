// NavBar.js

import "./NavBar.css";

import { Link } from "react-router-dom";
import React from "react";
import SearchBar from "../SearchBar/SearchBar"; // Importa el componente SearchBar sin llaves

const NavBar = () => {
  return (
    <div>
      {/* Enlaces a redes sociales o cualquier otro elemento */}
      
      {/* Enlace a la página "Home" */}
      <Link to="/home">
        <p>Home</p>
      </Link>

      {/* Enlace a la página "Create Pokemon" */}
      <Link to="/PokeFormCreate">
        <p>Create Pokemon</p>
      </Link>

      {/* Componente SearchBar */}
      <SearchBar />
    </div>
  );
};

export default NavBar;
