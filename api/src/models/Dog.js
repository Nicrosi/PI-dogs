const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    min_height: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    min_weight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    max_height: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    max_weight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    lifespan: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false
  });
};
