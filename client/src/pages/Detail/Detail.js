import "./Detail.css"

import { cleanDetailPokemon, getDetailPokemons } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
   const { id } =useParams()
   const dispatch = useDispatch();
   const pokemon = useSelector(state => state.pokemonDetails)
   
   useEffect(()=>{
    dispatch(cleanDetailPokemon())
    dispatch(getDetailPokemons(id))
   }, [dispatch, id])

    return (
      <div className>
        {Array.isArray(pokemon) && pokemon.length > 0 ?
          <>
            <div className>
              <h2>Pokemon Information</h2>
              <h3>{pokemon[0].name.toUpperCase()}</h3>
              <img src={pokemon[0].image} alt="not found"/>
              </div>
            <div className>
            <form >  
              <label>Hp:</label>       
                <p>{pokemon[0].hp}</p> 
              <label>Attack:</label>       
                <p>{pokemon[0].attack}</p>
              <label>Defense:</label>       
                <p>{pokemon[0].defense}</p>
              <label>Speed:</label>       
                <p>{pokemon[0].speed}</p>
              <label>Height:</label>       
                <p>{pokemon[0].height}</p> 
              <label>Weight:</label>       
                <p>{pokemon[0].weight}</p> 
              <label>Types:</label>       
                <p>{pokemon[0].types}</p>
              </form> 
              </div>                                   
          </>
        : (<div>
          <h2 className>Loading...</h2>
        <img className src="" alt=""/> </div>)
        }
      </div>
    );
  }
  
  export default Detail;