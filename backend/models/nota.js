'use strict';
module.exports = (sequelize, DataTypes) => {
  const Nota = sequelize.define('Nota', {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    archivada: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});



  return Nota;
};
