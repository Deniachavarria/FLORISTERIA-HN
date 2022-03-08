const express = require("express");
const morgan = require("morgan");
const rutas = require("./rutas");
require("dotenv").config();
const app = express();
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("json spaces", 2);
app.use("/api/", rutas);
app.use("/api/clientes", require("./rutas/rutasClientes"));
app.use("/api/colaboradores", require("./rutas/rutasColaboradores"));
app.use("/api/archivos", require("./rutas/rutasArchivos"));
app.use("/api/productos", require("./rutas/rutasProductos"));
app.use("/api/proveedores", require("./rutas/rutasProveedores"));
app.use("/api/categorias", require("./rutas/rutasCategorias"));
app.use("/api/contactos", require("./rutas/rutasContactos"));
app.use("/api/detalleFactura", require("./rutas/rutasDetalleFactura"));
app.use("/api/Facturas", require("./rutas/rutasFacturas"));
app.use("/api/Autenticacion", require("./rutas/rutasAutenticacion"));
app.use("/api/usuarios", require("./rutas/rutasUsuarios"));

app.listen(4001, () => {
  console.log("Servidor inicializado en el puerto 4001");
});
