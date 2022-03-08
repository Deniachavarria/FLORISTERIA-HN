const { Router } = require('express');
const controladorProveedor = require('../controladores/controladorProveedor');
const { body, query} = require('express-validator');
const router = Router();
router.get('/', controladorProveedor.Raiz);
router.get('/listar', controladorProveedor.listar);
router.get('/buscar', controladorProveedor.buscar);
router.post('/guardar',body('correo').isEmail().withMessage('Debe ser un correo valido')
, controladorProveedor.guardar);

router.put('/modificar', query('idProveedor').isInt().withMessage('Debe de enviar valores enteros para el id del proveedor')
,body('correo').isEmail().withMessage('Debe ser un correo valido')
, controladorProveedor.modificar);

router.put('/modificarestado',body('estado')
.isIn(['activo','inactivo']).withMessage('estado invalido debe ser: activo, inactivo')
.isLowercase().withMessage('Deben ir todas en minusculas'),
controladorProveedor.modificarEstado);
router.delete('/eliminar', controladorProveedor.eliminar);
module.exports = router;