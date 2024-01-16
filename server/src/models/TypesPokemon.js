const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Type = sequelize.define('Type', {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

  
    return Type;
  };
  