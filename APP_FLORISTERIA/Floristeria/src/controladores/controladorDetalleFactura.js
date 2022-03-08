const ModeloDetalleFactura = require("../modelos/modeloDetalleFactura");
const { validationResult } = require('express-validator');
exports.Raiz = (req, res) => {
  res.send("Esto es el inicio del modulo de Detalle Factura");
};
exports.listarDetalleFactura = async (req, res) => {
  const listaDetalleFactura = await ModeloDetalleFactura.findAll();
  if (listaDetalleFactura.lenght == 0) {
    res.send("No hay datos todavia");
  } else {
    res.json(listaDetalleFactura);
  }
};
exports.guardar = async (req, res) => {
  const validacion = validationResult(req); //capturar errores

  if (!validacion.isEmpty()) {
    res.json(validacion.array());
  } else {
    const { idFactura, idProducto, cantidad, precioVenta } = req.body;
    if (!idFactura || !idProducto || !cantidad || !precioVenta) {
      res.send("Debe enviar datos completos");
    } else {
      await ModeloDetalleFactura.create({
        idFactura: idFactura,
        idProducto: idProducto,
        cantidad: cantidad,
        precioVenta: precioVenta,
      })
        .then((data) => {
          console.log(data);
          res.send("Registro almacenado");
        })
        .catch((error) => {
          console.log(error);
          res.send("Hubo un error");
        });
    }
  }
};
exports.modificar = async (req, res) => {
  const validacion = validationResult(req); //capturar errores

  if (!validacion.isEmpty()) {
    res.json(validacion.array());
  } else {
    console.log(req.query);
    console.log(req.body);
    const { idDetalleFactura } = req.query;
    const { idFactura, idProducto, cantidad, precioVenta } = req.body;
    if (
      !idDetalleFactura ||
      !idFactura ||
      !idProducto ||
      !cantidad ||
      !precioVenta
    ) {
      res.send("Envie los datos completos");
    } else {
      var buscarDetalleFactura = await ModeloDetalleFactura.findOne({
        where: {
          idDetalleFactura: idDetalleFactura,
        },
      });
      if (!buscarDetalleFactura) {
        res.send("El id no esta");
      } else {
        console.log(buscarDetalleFactura.idFactura);
        buscarDetalleFactura.idFactura = idFactura;
        (buscarDetalleFactura.idProducto = idProducto),
          (buscarDetalleFactura.cantidad = cantidad),
          (buscarDetalleFactura.precioVenta = precioVenta);
        await buscarDetalleFactura
          .save()
          .then((data) => {
            console.log(data);
            res.send("Registro almacenado");
          })
          .catch((error) => {
            console.log(error);
            res.send("Error al actualizar los datos");
          });
      }
    }
  }
  res.send("Registro actualizado");
};
exports.eliminar = async (req, res) => {
  const { idDetalleFactura } = req.query;

  if (!idDetalleFactura) {
    res.send("Envie el id del Detalle de Factura");
  } else {
    await ModeloDetalleFactura.destroy({
      where: {
        idDetalleFactura: idDetalleFactura,
      },
    })

      .then((data) => {
        console.log(data);
        if (data == 0) {
          res.send("El id no esta");
        } else {
          res.send("Registro eliminado");
        }
        res.send("Registro eliminado");
      })
      .catch((error) => {
        console.log(error);
        res.send("Error al eliminar los datos");
      });
  }
};
