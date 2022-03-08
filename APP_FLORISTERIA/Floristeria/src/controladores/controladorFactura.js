const ModeloFactura = require("../modelos/modeloFactura");
const { validationResult } = require("express-validator"); //variable capturar errores
exports.Raiz = (req, res) => {
  res.send("Esto es el inicio del modulo de Factura");
};
exports.listarFacturas = async (req, res) => {
  const listaFacturas = await ModeloFactura.findAll();
  if (listaFacturas.lenght == 0) {
    res.send("No hay datos todavia");
  } else {
    res.json(listaFacturas);
  }
};
exports.guardar = async (req, res) => {
  const validacion = validationResult(req); //capturar errores

  if (!validacion.isEmpty()) {
    res.json(validacion.array());
  } else {
    const { fecha, idCliente, tipoPago, idColaborador, estado } = req.body;
    if (!fecha || !idCliente || !tipoPago || !idColaborador || !estado) {
      res.send("Debe enviar datos completos");
    } else {
      await ModeloFactura.create({
        fecha: fecha,
        idCliente: idCliente,
        tipoPago: tipoPago,
        idColaborador: idColaborador,
        estado: estado,
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
    const { idFactura } = req.query;
    const { fecha, idCliente, tipoPago, idColaborador, estado } = req.body;
    if (
      !idFactura ||
      !fecha ||
      !idCliente ||
      !tipoPago ||
      !idColaborador ||
      !estado
    ) {
      res.send("Envie los datos completos");
    } else {
      var buscarFactura = await ModeloFactura.findOne({
        where: {
          idFactura: idFactura,
        },
      });
      if (!buscarFactura) {
        res.send("El id no esta");
      } else {
        console.log(buscarFactura.descripcion);
        (buscarFactura.fecha = fecha),
          (buscarFactura.idCliente = idCliente),
          (buscarFactura.tipoPago = tipoPago);
        (buscarFactura.idColaborador = idColaborador),
          (buscarFactura.estado = estado);
        await buscarFactura
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
  const { idFactura } = req.query;

  if (!idFactura) {
    res.send("Envie el id de la Factura ");
  } else {
    await ModeloFactura.destroy({
      where: {
        idFactura: idFactura,
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
