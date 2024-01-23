let myFavorites = []

const postFavPoke = (req,res) =>{
    try {
        const character = req.body
        const characterFound = myFavorites.find (fav => fav.id === character.id)
    
        if (characterFound) throw new Error ("El pokemon ya está en favoritos");
        
        myFavorites.push (character);
    
        return res.status(200).json (myFavorites);
        
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

const deleteFavPoke = (req,res)  => {
    const {id} =req.params;

    myFavorites = myFavorites.filter ((favorite) => favorite.id !== +id);

    return res.status(200).json (myFavorites);
}

module.exports = {
    postFavPoke,
    deleteFavPoke
}