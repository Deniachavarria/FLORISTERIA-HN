const { Router } = require("express");
const controladorDetalleFactura = require("../controladores/controladorDetalleFactura");
const { body, query } = require("express-validator");
const router = Router();
router.get("/", controladorDetalleFactura.Raiz);
router.get("/listar", controladorDetalleFactura.listarDetalleFactura);
router.post(
  "/guardar",

  body("idFactura")
    .isInt()
    .withMessage("Debe enviar valores enteros para el id de la factura"),
  body("idProducto")
    .isInt()
    .withMessage("Debe enviar valores enteros para el id del producto"),
  body("cantidad")
    .isInt()
    .withMessage("Debe enviar valores enteros para la cantidad"),

  body("precioVenta").isDecimal().withMessage("Precio invalido"),

  controladorDetalleFactura.guardar
);
router.put(
  "/modificar",
  body("idFactura")
    .isInt()
    .withMessage("Debe enviar valores enteros para el id de la factura"),
  body("idProducto")
    .isInt()
    .withMessage("Debe enviar valores enteros para el id del producto"),
  body("cantidad")
    .isInt()
    .withMessage("Debe enviar valores enteros para la cantidad"),

  body("precioVenta").isDecimal().withMessage("Precio invalido"),
  controladorDetalleFactura.modificar
);
router.delete("/eliminar", controladorDetalleFactura.eliminar);
module.exports = router;
