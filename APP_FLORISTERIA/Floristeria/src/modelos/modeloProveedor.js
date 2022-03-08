const sequelize = require("sequelize");
const db = require("../configuraciones/db");
const Proveedor = db.define(
  "proveedor",
  {
    idProveedor: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: sequelize.STRING(50),
      allowNull: false,
    },
    correo: {
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
    tableName: "proveedores",
    timestamps: false,
  }
);
module.exports = Proveedor;
