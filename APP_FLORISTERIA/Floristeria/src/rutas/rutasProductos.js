const {Router} = require('express');
const controladorProducto = require('../controladores/controladorProducto');
const { body, query } = require("express-validator"); 
const router = Router();
router.get('/', controladorProducto.Raiz);
router.get('/listar', controladorProducto.listarProductos);
router.get('/buscar', controladorProducto.buscarProductos);
router.post('/guardar', 
body("nombre").isString().withMessage("Favor ingresar datos alfabeticos."),
body("precio").isFloat().withMessage("Favor ingresar datos numericos."),
body("stock").isInt().withMessage("Favor ingresar datos numericos."),
body('estado')
.isIn(['activo','inactivo']).withMessage('estado invalido debe ser: activo, inactivo')
.isLowercase().withMessage('Deben ir todas en minusculas'),
body("idCategoria").isInt().withMessage("Debe ingresar datos numericos."),
body("idProveedor").isInt().withMessage("Debe ingresar datos numericos."),
controladorProducto.guardarProductos);
router.put('/modificar', 
body("idProducto").isInt().withMessage("Debe ingresar datos numericos."),
body("nombre").isString().withMessage("Favor ingresar datos alfabeticos."),
body("precio").isFloat().withMessage("Favor ingresar datos numericos."),
body("stock").isInt().withMessage("Favor ingresar datos numericos."),
body('estado')
.isIn(['activo','inactivo']).withMessage('estado invalido debe ser: activo, inactivo')
.isLowercase().withMessage('Deben ir todas en minusculas'),
body("idCategoria").isInt().withMessage("Debe ingresar datos numericos."),
body("idProveedor").isInt().withMessage("Debe ingresar datos numericos."),
controladorProducto.modificarProductos);
router.delete('/eliminar', controladorProducto.eliminarProductos);
module.exports = router;