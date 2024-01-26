// PokeCard.js

import "./PokeCard.css"

import {Link} from "react-router-dom"

const Card = (pokemon) => {
    return(
        <div className>
            <Link className  to={`/detail/${pokemon.id}`}>
                <h4>{pokemon.name.toUpperCase()}</h4>
            </Link>
            <img src={pokemon.image} alt="img" />
            <p>Types: {pokemon.types}</p> 
        </div>
    )
}

export default Card;