// App.js

import './App.css';

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Detail from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./components/Login/Login";
import NavBar from "./components/NavBar/NavBar";
import PokeCardList from "./components/PokeCardList/PokeCardList";
import axios from 'axios';

const URL = 'http://localhost:3001/pokemon/login/';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [access, setAccess] = useState(false);
  const [error] = useState(null);
  
  
  const login = async (userData) => {
    try {
      const response = await axios.post(URL, userData);
      console.log(response.data);
      if (response.data.success) {
        localStorage.setItem('accessToken', response.data.accessToken);
        setAccess(true);
        navigate('/landing');
      } else {
        console.log('Inicio de sesión fallido');
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setAccess(true);
    }
    !access && navigate('/');
  }, [access, navigate]);


  const onSearch = async (id) => {
    try {
      const { data } = await axios(`http://localhost:3001/pokemon/${id}`);
      
      if (data.name) {
        setCharacters((oldChars) => [...oldChars, data]);
      }
    } catch (error) {
      alert("no hay personajes con este ID");
    } 
  };

  const onClose = (id) => {
    const charactersFiltered = characters.filter(character => character.id !== id)
    setCharacters(charactersFiltered)
  }

  return (
    <div className="App">
      {location.pathname !== '/' && <NavBar onSearch={onSearch} setAccess={setAccess} />}
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      <Routes>
        <Route path='/' element={<Login login={login} />} />
        <Route path='/landing' element={<LandingPage />} />
        <Route path="/detail/:id" element={<Detail />} />  
        <Route exact path="/home" element={<Home />} />
        <Route path='/PokeCardList' element={<PokeCardList characters={characters} onClose={onClose} />} />
      </Routes>
    </div>
  );
}

export default App;
