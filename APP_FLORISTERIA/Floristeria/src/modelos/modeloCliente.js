const sequelize = require("sequelize");
const db = require("../configuraciones/db");
const Cliente = db.define(
  "cliente",
  {
    idCliente: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: sequelize.STRING(50),
      allowNull: false,
    },
    apellido: {
      type: sequelize.STRING(50),
      allowNull: false,
    },
    direccion: {
      type: sequelize.STRING(200),
      allowNull: true,
    },
    telefono: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
    correo: {
      type: sequelize.STRING(50),
      allowNull: true,
    },
    estado: {
      type: sequelize.ENUM("activo", "inactivo"),
      allowNull: true,
      defaultValue: "activo",
    },
  },
  {
    tableName: "clientes",
    timestamps: false,
  }
);
module.exports = Cliente;
