const ModeloCategoria = require('../modelos/modeloCategoria');
const { validationResult } = require("express-validator");

// Funcion para iniciar el modulo de categorias 
exports.Raiz = (req, res) => {
    res.send("Inicio del modulo de categorías");
};

//Funcion para enlistar las categorias que tenemos en la base de datos
exports.listarCategorias = async (req, res) => {
    const listaCategorias = await ModeloCategoria.findAll();
    if (listaCategorias.length == 0) {
        res.send("No existen datos en el modulo de categorías");
    }
    else {
        res.json(listaCategorias);
    }
};

//funcion para buscar en el modulo de categorias pasandole como parametro en estado
exports.buscarCategorias = async (req, res) => {
    const estado  = req.query.estado;
    const listaCategorias = await ModeloCategoria.findAll({
        where: {
            estado: estado,
        },
    });
    if (listaCategorias.length == 0) {
        res.send("No existen datos en el modulo de categorias con estado: ");
    }
    else {
        res.json(listaCategorias);
    }
};

//funcion para guardar los datos en el modulo de categoria
exports.guardarCategorias = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else {
        const { nombre, estado } = req.body;
        if (!nombre || !estado) {
            res.send("Favor enviar los datos completos.");
        }
        else {
            await ModeloCategoria.create({
                nombre: nombre,
                estado: estado,
            })
                .then((data) => {
                    console.log(data);
                    res.send("Registro almacenado.")
                })
                .catch((error) => {
                    console.log(error);
                    res.send("Error al guardar los datos");
                })
        }
    }
};

//funcion para modificar los datos del modulo de categorias.
exports.modificarCategorias = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else {
        const { idCategoria } = req.query;
        const { nombre, estado } = req.body;
        if (!idCategoria || !nombre || !estado) {
            res.send("Favor enviar los datos completos.");
        }
        else {
            var buscarCategorias = await ModeloCategoria.findOne({
                where: {
                    idCategoria: idCategoria,
                },
            });
            if (!buscarCategorias) {
                res.send("El id no existe.");
            }
            else {
                console.log(buscarCategorias.login);
                buscarCategorias.nombre = nombre;
                buscarCategorias.estado = estado;

                await buscarCategorias
                    .save()
                    .then((data) => {
                        console.log(data);
                        res.send("Registro modificado");
                    })
                    .catch((error) => {
                        console.log(error);
                        res.send("Error al modificar los datos");
                    })
            }
        }
    }
};

//funcion para eliminar los datos en el modulo de categorias
exports.eliminarCategorias = async (req, res) => {
    const { idCategoria } = req.query;
    if (!idCategoria) {
        res.send("Envie el id de la categoria que desea eliminar.");
    }
    else {
        var buscarCategorias = await ModeloCategoria.findOne({
            where: {
                idCategoria: idCategoria,
            },
        });
        if (!buscarCategorias) {
            res.send("El id no existe.");
        }
        else {
            await ModeloCategoria.destroy({
                where: {
                    idCategoria: idCategoria,
                },
            }).then((data) => {
                console.log(data);
                res.send("Registro eliminado");
            }).catch((error) => {
                console.log(error);
                res.send("Error al eliminar los datos");
            })
        }
    }
};