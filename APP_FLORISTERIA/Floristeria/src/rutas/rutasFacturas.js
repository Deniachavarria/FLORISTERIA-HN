const { Router } = require("express");
const controladorFactura = require("../controladores/controladorFactura");
const { body, query } = require("express-validator");
const router = Router();
router.get("/", controladorFactura.Raiz);
router.get("/listar", controladorFactura.listarFacturas);
router.post(
  "/guardar",

  body("idCliente")
    .isInt()
    .withMessage("Debe enviar valores enteros para el id del cliente"),
  body("tipoPago")
    .isIn(["efectivo", "targeta"])
    .withMessage("estado invalido debe ser: efectivo, targeta"),
  body("idColaborador")
    .isInt()
    .withMessage("Debe enviar valores enteros para el id del colaborador"),
  body("estado")
    .isIn(["activo", "inactivo"])
    .withMessage("estado invalido debe ser: activo, inactivo"),

  controladorFactura.guardar
);
router.put(
  "/modificar",
  body("idCliente")
    .isInt()
    .withMessage("Debe enviar valores enteros para el id del cliente"),
  body("tipoPago")
    .isIn(["efectivo", "targeta"])
    .withMessage("estado invalido debe ser: efectivo, targeta"),
  body("idColaborador")
    .isInt()
    .withMessage("Debe enviar valores enteros para el id del colaborador"),
  body("estado")
    .isIn(["activo", "inactivo"])
    .withMessage("estado invalido debe ser: activo, inactivo"),
  controladorFactura.modificar
);
router.delete("/eliminar", controladorFactura.eliminar);
module.exports = router;
