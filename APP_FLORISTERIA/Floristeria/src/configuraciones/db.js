const sequelize = require("sequelize");
const db = new sequelize(
  'floristeria', // nombre de la base de datos
    'root', // usuario de la base de datos
    'P@ssw0rd', // contraseña de la base de datos
    {
        host: '127.0.0.1', // servidor
        dialect: 'mysql', // dbns
        port: '3306', // puerto por defecto
    }
);
module.exports = db;
