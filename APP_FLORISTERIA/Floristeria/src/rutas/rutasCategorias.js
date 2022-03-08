const {Router} = require("express");
const controladorCategoria = require('../controladores/controladorCategoria');
const { body, query } = require("express-validator"); 
const router = Router();
router.get("/", controladorCategoria.Raiz);

router.get("/listar", controladorCategoria.listarCategorias);

router.post("/guardar",
body("nombre").isString().withMessage("Debe ingresar datos alfabeticos"),
body("estado").isBoolean().withMessage("Debe ingresar 1 si es verdadero o 0 si no es verdadero"),
controladorCategoria.guardarCategorias);

router.put("/modificar", 
body("idCategoria").isInt().withMessage("Debe ingresar solamente datos numericos"),
body("nombre").isString().withMessage("Debe ingresar datos alfabeticos"),
body("estado").isBoolean().withMessage("Debe ingresar 1 si es verdadero o 0 si no es verdadero"),
controladorCategoria.modificarCategorias);

router.delete("/eliminar", controladorCategoria.eliminarCategorias);

router.get("/buscar", controladorCategoria.buscarCategorias);

module.exports = router;
