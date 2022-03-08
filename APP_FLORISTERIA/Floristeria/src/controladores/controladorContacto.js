const ModeloContacto = require('../modelos/modeloContacto');
const { validationResult } = require('express-validator');
exports.Raiz = (req, res) => {
    res.send("Esto es el inicio del modulo de contacto");
};
exports.listar = async (req, res) => {
    const lista = await ModeloContacto.findAll();
    if (lista.lenght == 0) {
        res.send("No hay datos todavia");
    }
    else {
        res.json(lista);
    }
};

exports.buscar= async (req, res) => {
    const fil  = req.query.filtro;
    const lista = await ModeloContacto.findAll({
        where:{
            estado: fil
        }
    });
    if(lista.length==0){
     res.send("No existen datos");
    }
    else{
        res.json(lista);
    }
 };

exports.guardar = async (req, res) => {
    const validacion = validationResult(req);

    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else {

        const { idProveedores, nombre, apellido, correo, telefono, sexo } = req.body;
        if (!nombre || !idProveedores || !apellido || !correo || !telefono) {
            res.send("Debe enviar datos completos");
        }
        else {
            await ModeloContacto.create({
                idProveedores: idProveedores,
                nombre: nombre,
                apellido: apellido,
                correo: correo,
                telefono: telefono,
                sexo: sexo
            }
            )
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
    const validacion = validationResult(req);

    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else {
        const { idContacto } = req.query;
        const { idProveedores, nombre, apellido, correo, estado, telefono, sexo } = req.body;
        if (!idContacto || !nombre || !idProveedores || !apellido || !correo || !telefono) {
            res.send("Envie los datos completos");
        }
        else {
            var buscarcontacto = await ModeloContacto.findOne({
                where: {
                    idContacto: idContacto,
                }
            });
            if (!buscarcontacto) {
                res.send("El idContacto no esta");
            }
            else {
                console.log(buscarcontacto.nombre);
                buscarcontacto.idProveedores = idProveedores,
                    buscarcontacto.nombre = nombre;
                buscarcontacto.apellido = apellido,
                    buscarcontacto.correo = correo,
                    buscarcontacto.estado = estado,
                    buscarcontacto.telefono = telefono,
                    buscarcontacto.sexo = sexo
                await buscarcontacto.save()
                    .then((data) => {
                        console.log(data);
                        res.send("Registro almacenado");
                    })
                    .catch((error) => {
                        console.log(error);
                        res.send("Error al actualizar los datos");
                    })
            }
        }
    }
};

exports.modificarEstado = async (req, res) => {
    const { idContacto } = req.query;
    const { estado } = req.body;
    if (!idContacto || !estado) {
        res.send("Envie los datos completos");
    }
    else {
        var buscarcontacto = await ModeloContacto.findOne({
            where: {
                idContacto: idContacto,
            }
        });
        if (!buscarcontacto) {
            res.send("El id no existe");
        }
        else {
            buscarcontacto.estado = estado;
            await buscarcontacto.save()
                .then((data) => {
                    console.log(data);
                    res.send("Registro actualizado");
                })
                .catch((error) => {
                    console.log(error);
                    res.send("Error al actualizar los datos");
                });
        }
    }
};

exports.eliminar = async (req, res) => {

    const { idContacto } = req.query;

    if (!idContacto) {
        res.send("Envie el idContacto del producto");
    }
    else {


        await ModeloContacto.destroy({
            where:
            {
                idContacto: idContacto,
            }

        })

            .then((data) => {
                console.log(data);
                if (data == 0) {
                    res.send("El idContacto no esta");
                }
                else {
                    res.send("Registro eliminado");
                }
            })
            .catch((error) => {
                console.log(error);
                res.send("Error al eliminar los datos");
            })

    }

};