const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TypesPokemon = sequelize.define('TypesPokemon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  TypesPokemon.associate = (models) => {
    TypesPokemon.belongsToMany(models.Pokemon, {
      through: 'PokemonType',
      foreignKey: 'typeId',
    });
  };
 
  return TypesPokemon;
};
