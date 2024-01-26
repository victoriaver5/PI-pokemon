const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TypesPokemon = sequelize.define('TypesPokemon', {
    Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false, 
  });

 
  return TypesPokemon;
};
