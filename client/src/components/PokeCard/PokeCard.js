import "./PokeCard.css";

import { Link } from "react-router-dom";

const PokeCard = (pokemon) => {
    return(
        <div className="your-class-name"> {/* Agrega una clase CSS correcta */}
            <Link className="your-class-name" to={`/detail/${pokemon.id}`}>
                <h4>{pokemon.name.toUpperCase()}</h4>
            </Link>
            <img src={pokemon.image} alt="img" />
            <p>Types: {pokemon.types}</p> 
        </div>
    )
}

export default PokeCard;