const sequelize = require("sequelize");
const db = require("../configuraciones/db");
const Producto = db.define(
  "producto",
  {
    idProducto: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: sequelize.STRING(50),
      allowNull: false,
    },
    precio: {
      type: sequelize.DOUBLE,
      allowNull: false,
    },
    stock: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    estado: {
      type: sequelize.ENUM("activo", "inactivo"),
      allowNull: true,
      defaultValue: "activo",
    },
    idCategoria: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    idProveedor: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    imagen: {
      type: sequelize.STRING(250),
      allowNull: true,
    },
  },
  {
    tableName: "productos",
    timestamps: false,
  }
);
module.exports = Producto;
