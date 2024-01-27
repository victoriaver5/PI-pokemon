import React, { useEffect } from "react";
import { getAllPokemons, getTypes } from "../../redux/actions/actions";

import PokeCardList from "../../components/PokeCardList/PokeCardList";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div className="home-container">
      <PokeCardList />
    </div>
  );
};

export default Home;
