const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const DetalleFactura = db.define(
    "detalleFactura",
    {
        idDetalleFactura:{
            type:sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull: false,
        },
        idFactura:{
            type:sequelize.INTEGER,
            allowNull: false,
        },
        idProducto:{
            type:sequelize.INTEGER,
            allowNull: false,
        },
        cantidad:{
            type:sequelize.INTEGER,
            allowNull: false,
        },
        precioVenta:{
            type:sequelize.DOUBLE,
            allowNull: false,
        },
    },
    {
        tableName: "detalleFacturas",
        timestamps: false,
    }
);
module.exports=DetalleFactura;