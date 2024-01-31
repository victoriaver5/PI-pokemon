import "./PokeCard.css";

import { Link } from "react-router-dom";

const PokeCard = ({ name, image, types }) => {
    return (
      <div className="your-class-name">
        <Link to={`/detail/${name}`}>
          <h4>{name.toUpperCase()}</h4>
        </Link>
        <img src={image} alt="img" />
        <p>Types: {types && types.join(', ')}</p>
      </div>
    );
  };

export default PokeCard;
