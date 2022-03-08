const { Router } = require("express");
const { body } = require("express-validator");
const controladorCliente = require("../controladores/controladorCliente");
const router = Router();
router.get("/", controladorCliente.Raiz);
router.get("/listar", controladorCliente.listaCliente);
router.post(
  "/guardar",

  body("nombre").notEmpty().withMessage("Debe ingresar el nombre del cliente"),
  body("apellido")
    .notEmpty()
    .withMessage("Debe ingresar el apellido del cliente"),

  controladorCliente.guardar
);
router.put(
  "/modificar",
  body("nombre").notEmpty().withMessage("Debe ingresar el nombre del cliente"),
  body("apellido")
    .notEmpty()
    .withMessage("Debe ingresar el apellido del cliente"),
  controladorCliente.modificar
);
router.delete("/eliminar", controladorCliente.eliminar);
module.exports = router;
