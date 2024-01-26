import "./SearchBar.module.css"

import { getByNamePokemon } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useState } from "react";

const SearchBar = () => {
    const [name, setName] = useState("");
    const dispatch = useDispatch();


    const handleChange = (event) => {
        setName(event.target.value);
    }

    const onSearch = (event) => {
        event.preventDefault()
        dispatch(getByNamePokemon(name));
    }

    return(
        <div>
            <form onSubmit={onSearch}>
            <input type="search" onChange={handleChange} placeholder="name..."/>
            <button type='submit'>Search</button>
            </form>
        </div>
    )
}

export default SearchBar;