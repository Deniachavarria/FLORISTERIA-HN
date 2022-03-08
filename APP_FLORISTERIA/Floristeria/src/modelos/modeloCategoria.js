const sequelize = require("sequelize");
const db = require("../configuraciones/db");
const Categoria = db.define(
  "categoria",
  {
    idCategoria: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: sequelize.STRING(50),
      allowNull: false,
    },
    estado: {
      type: sequelize.ENUM("activo", "inactivo"),
      allowNull: true,
      defaultValue: "activo",
    },
  },
  {
    tableName: "categorias",
    timestamps: false,
  }
);
module.exports = Categoria;
