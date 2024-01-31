// NavBar.js

import "./NavBar.css";

import { Link } from "react-router-dom";
import React from "react";

const NavBar = ({ onSearch, logout }) => {
  const handleLogout = () => {
    localStorage.removeItem('access');
    logout(); // Llamas a la función de logout pasada como prop
  };

  return (
    <div className="navbar">
      <Link to="/home" className="nav-link">
        <p>Home</p>
      </Link>
      <Link to="/PokeFormCreate" className="nav-link">
        <p>Create Pokemon</p>
      </Link>
      <div className="nav-right">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;


