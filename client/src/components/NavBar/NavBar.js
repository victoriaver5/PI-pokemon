import "./NavBar.css";

import { Link } from "react-router-dom";
import React from "react";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {
  return (
    <div className="your-class-name"> {/* Agrega una clase CSS correcta */}
      {/* Enlaces a redes sociales o cualquier otro elemento */}
      
      {/* Enlace a la página "Home" */}
      <Link to="/home" className="your-class-name">
        <p>Home</p>
      </Link>

      {/* Enlace a la página "Create Pokemon" */}
      <Link to="/PokeFormCreate" className="your-class-name">
        <p>Create Pokemon</p>
      </Link>

      {/* Componente SearchBar */}
      <SearchBar />
    </div>
  );
};

export default NavBar;

