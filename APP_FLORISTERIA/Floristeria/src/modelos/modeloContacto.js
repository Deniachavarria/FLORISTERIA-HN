const sequelize = require("sequelize");
const db = require("../configuraciones/db");
const Contacto = db.define(
  "contacto",
  {
    idContacto: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    idProveedores: {
      type: sequelize.INTEGER,
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
    correo: {
      type: sequelize.STRING(50),
      allowNull: true,
    },
    telefono: {
      type: sequelize.STRING(8),
      allowNull: true,
    },
    sexo: {
      type: sequelize.ENUM("femenino", "masculino"),
      allowNull: true,
    },
    estado: {
      type: sequelize.ENUM("activo", "inactivo"),
      allowNull: true,
      defaultValue: "activo",
    },
  },
  {
    tableName: "contactos",
    timestamps: false,
  }
);
module.exports = Contacto;
