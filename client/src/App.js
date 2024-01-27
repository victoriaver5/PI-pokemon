import './App.css';

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Detail from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";
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

  const login = async (userData) => {
    try {
      const { email, password } = userData;
      const { data } = await axios(URL + `?email=${email}&password=${password}`);
      const { access } = data;

      setAccess(access);
      access && navigate('/home');
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
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
      <Routes>
        <Route path='/' element={<Login login={login} />} />
        <Route path="/detail/:id" element={<Detail />} />  
        <Route exact path="/home" element={<Home />} />
        <Route path='/PokeCardList' element={<PokeCardList characters={characters} onClose={onClose} />} />
      </Routes>
    </div>
  );
}

export default App;
