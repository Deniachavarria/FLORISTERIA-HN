const fs = require("fs");
const path = require("path");
const msj = require("../componentes/mensaje");
const ModeloColaborador = require("../modelos/modeloColaborador");
const ModeloProducto = require("../modelos/modeloProducto");

exports.Recibir = async (req, res) => {
  const { filename } = req.file;
  const { idColaborador } = req.query;
  var BuscarColaborador = await ModeloColaborador.findOne({
    where: {
      idColaborador: idColaborador,
    },
  });

  if (!BuscarColaborador) {
    msj("La imagen no existe", 200, [], res);
  } else {
    const buscarImagen = fs.existsSync(
      path.join(__dirname, "../public/img/" + BuscarColaborador.imagen)
    );
    if (!buscarImagen) {
      console.log("La imagen no existe");
    } else {
      try {
        fs.unlinkSync(
          path.join(__dirname, "../public/img/" + BuscarColaborador.imagen)
        );
        console.log("Imagen eliminada");
      } catch (error) {
        console.log(error);
        console.log("No se elimino");
      }
    }
    BuscarColaborador.imagen = filename;
    await BuscarColaborador.save()
      .then((data) => {
        msj("Imagen actualizada", 200, [], res);
      })
      .catch((error) => {
        console.log(error);
        msj("Error la guardar la imagen", 200, [], res);
      });
  }
};

exports.RecibirProducto = async (req, res) => {
  const { filename } = req.file;
  const { idProducto } = req.query;
  var BuscarProductos = await ModeloProducto.findOne({
    where: {
      idProducto: idProducto,
    },
  });
  if (!BuscarProductos) {
    msj("La imagen no existe", 200, [], res);
  } else {
    const buscarImagen = fs.existsSync(
      path.join(__dirname, "../public/img/" + BuscarProductos.imagen)
    );
    if (!buscarImagen) {
      console.log("La imagen no existe");
    } else {
      try {
        fs.unlinkSync(
          path.join(__dirname, "../public/img/" + BuscarProductos.imagen)
        );
        console.log("Imagen eliminada");
      } catch (error) {
        console.log(error);
        console.log("No se elimino");
      }
    }
    BuscarProductos.imagen = filename;
    await BuscarProductos.save()
      .then((data) => {
        msj("Imagen actualizada", 200, [], res);
      })
      .catch((error) => {
        console.log(error);
        msj("Error la guardar la imagen", 200, [], res);
      });
  }
};
