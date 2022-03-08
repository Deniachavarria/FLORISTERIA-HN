const { Router } = require('express');
const controladorContacto = require('../controladores/controladorContacto');
const { body, query} = require('express-validator');
const router = Router();
router.get('/', controladorContacto.Raiz);
router.get('/listar', controladorContacto.listar);
router.get('/buscar', controladorContacto.buscar);
router.post('/guardar', body('idProveedores').isInt().withMessage('Debe de enviar valores enteros para el id del proveedor'),
body('correo').isEmail().withMessage('Debe ser un correo valido'),
body('telefono').isLength({min:8, max:8}).withMessage('El telefono debe contener 8 digitos').isNumeric('Deben ser numeros para el telefono'),
body('sexo')
.isIn(['femenino','masculino']).withMessage('sexo invalido debe ser: femenino, masculino')
.isLowercase().withMessage('Deben ir todas en minusculas')
, controladorContacto.guardar);

router.put('/modificar',query('idContacto').isInt().withMessage('Debe de enviar valores enteros para el id del proveedor')
, body('idProveedores').isInt().withMessage('Debe de enviar valores enteros para el id del proveedor'),
body('correo').isEmail().withMessage('Debe ser un correo valido'),
body('estado')
.isIn(['activo','inactivo']).withMessage('estado invalido debe ser: activo, inactivo')
.isLowercase().withMessage('Deben ir todas en minusculas'),
body('telefono').isLength({min:8, max:8}).withMessage('El telefono debe contener 8 digitos').isNumeric('Deben ser numeros para el telefono'),
body('sexo')
.isIn(['femenino','masculino']).withMessage('sexo invalido debe ser: femenino, masculino')
.isLowercase().withMessage('Deben ir todas en minusculas')
, controladorContacto.modificar);

router.put('/modificarestado', body('estado')
.isIn(['activo','inactivo']).withMessage('estado invalido debe ser: activo, inactivo')
.isLowercase().withMessage('Deben ir todas en minusculas'),
controladorContacto.modificarEstado);
router.delete('/eliminar',query('idContacto').isInt().withMessage('Debe de enviar valores enteros para el id del proveedor')
, controladorContacto.eliminar);
module.exports = router;