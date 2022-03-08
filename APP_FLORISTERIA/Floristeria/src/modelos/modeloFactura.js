const sequelize = require("sequelize");
const db = require("../configuraciones/db");
const Factura = db.define(
  "factura",
  {
    idFactura: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fecha: {
      type: sequelize.DATE,
      allowNull: false,
    },
    idCliente: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    tipoPago: {
      type: sequelize.ENUM("efectivo", "targeta"),
      allowNull: false,
    },
    idColaborador: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    estado: {
      type: sequelize.ENUM("activo", "inactivo"),
      allowNull: true,
      defaultValue: "activo",
    },
  },
  {
    tableName: "facturas",
    timestamps: false,
  }
);
module.exports = Factura;
