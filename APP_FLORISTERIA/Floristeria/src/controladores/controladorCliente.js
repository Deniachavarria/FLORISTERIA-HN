const ModeloCliente = require("../modelos/modeloCliente");
const { validationResult } = require("express-validator"); //variable capturar errores
exports.Raiz = (req, res) => {
  res.send("Esto es el inicio de el modulo de cliente");
};

exports.listaCliente = async (req, res) => {
  const listaClientes = await ModeloCliente.findAll();

  if (listaClientes.length == 0) {
    res.send("No existe datos");
  } else {
    res.json(listaClientes);
  }
};

exports.guardar = async (req, res) => {
  const validacion = validationResult(req); //capturar errores

  if (!validacion.isEmpty()) {
    res.json(validacion.array());
  } else {
    const { nombre, apellido, direccion, telefono, correo } = req.body;

    if (!nombre || !apellido) {
      res.send("Debe enviar los datos completos");
    } else {
      await ModeloCliente.create({
        nombre: nombre,
        apellido: apellido,
        direccion: direccion,
        telefono: telefono,
        correo: correo,
      })
        .then((data) => {
          console.log(data);
          res.send("Registro Alamacenado");
        })
        .catch((error) => {
          console.log(error);
          res.send("Error al guardar los datos");
        });
    }
  }
};

exports.modificar = async (req, res) => {
  console.log(req.query);
  console.log(req.body);
  const { id } = req.query;
  const { nombre, apellido, direccion, telefono, correo, estado } = req.body;

  if (!id || !nombre || !apellido) {
    res.send("Envie los datos completos");
  } else {
    var buscarCliente = await ModeloCliente.findOne({
      //var porque queremos que cambie el valor
      // findOne buscar un id exista dentro la db
      where: {
        id: id,
      },
    });

    if (!buscarCliente) {
      res.send("El id no existe");
    } else {
      buscarCliente.nombre = nombre; //asignar valores sustituir valores
      buscarCliente.apellido = apellido;
      buscarCliente.direccion = direccion;
      buscarCliente.telefono = telefono;
      buscarCliente.correo = correo;
      buscarCliente.estado = estado;

      //modificar en la bd

      await buscarCliente
        .save()
        .then((data) => {
          //ver los datos
          console.log(data); //ver dato

          res.send("Registro actualizado");
        })
        .catch((error) => {
          console.log(data);
          res.send("Error al actualizar");
        });
    }
  }
};

exports.eliminar = async (req, res) => {
  //async para que la peticion se espere que responda el servidor
  console.log(req.query);
  console.log(req.body);
  const { id } = req.query; //capture los valores

  if (!id) {
    res.send("Envie el id del registro");
  } else {
    var buscarCliente = await ModeloCliente.findOne({
      //var porque queremos que cambie el valor
      // findOne buscar un id exista dentro la db
      where: {
        id: id,
      },
    });

    if (!buscarCliente) {
      res.send("El id no existe");
    } else {
      await ModeloCliente.destroy({
        //destroy elimina
        where: {
          id: id,
        },
      }) //indicar el where

        .then((data) => {
          //ver los datos
          console.log(data); //ver dato

          res.send("Registro eliminado");
        })
        .catch((error) => {
          console.log(data);
          res.send("Error al eliminar el registro");
        });
    }
  }
};
