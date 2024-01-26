import "./Home.css"

import { getAllPokemons, getTypes } from "../../redux/actions.js";

import { PokeCardList } from "../../components/PokeCardList/PokeCardList.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAllPokemons())
    dispatch(getTypes())
  },[dispatch])

  return (
    <div className>
      
      <PokeCardList/>
        </div>
  );
};
export default Home;