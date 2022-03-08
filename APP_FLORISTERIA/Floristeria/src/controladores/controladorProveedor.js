const ModeloProveedor = require('../modelos/modeloProveedor');
const { validationResult } = require('express-validator');
exports.Raiz = (req, res) => {
    res.send("Esto es el inicio del modulo de proveedor");
};
exports.listar = async (req, res) => {
    const lista = await ModeloProveedor.findAll();
    if (lista.lenght == 0) {
        res.send("No hay datos todavia");
    }
    else {
        res.json(lista);
    }
};

exports.buscar = async (req, res) => {
    const fil  = req.query.filtro;
    const lista = await ModeloProveedor.findAll({
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
        const { nombre, correo } = req.body;
        if (!nombre) {
            res.send("Debe enviar datos completos");
        }
        else {
            await ModeloProveedor.create({
                nombre: nombre,
                correo: correo
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
        const { idProveedor } = req.query;
        const { nombre, correo, estado } = req.body;
        if (!idProveedor) {
            res.send("Envie los datos completos");
        }
        else {
            var buscarproveedor = await ModeloProveedor.findOne({
                where: {
                    idProveedor: idProveedor,
                }
            });
            if (!buscarproveedor) {
                res.send("El idProveedor no esta");
            }
            else {
                console.log(buscarproveedor.nombre);
                buscarproveedor.nombre = nombre;
                buscarproveedor.correo = correo;
                buscarproveedor.estado = estado;
                await buscarproveedor.save()
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
    const { idProveedor } = req.query;
    const { estado } = req.body;
    if(!idProveedor || !estado ){
        res.send("Envie los datos completos");
    }
    else{
        var buscarproveedor = await ModeloProveedor.findOne({
            where:{
                idProveedor: idProveedor,
            }
        });
        if(!buscarproveedor){
            res.send("El id no existe");
        }
        else{
            buscarproveedor.estado=estado;
            await buscarproveedor.save()
            .then((data)=>{
                console.log(data);
                res.send("Registro actualizado");
            })
            .catch((error)=>{
                console.log(error);
                res.send("Error al actualizar los datos");
            });
        }
    }
 };

exports.eliminar = async (req, res) => {

    const { idProveedor } = req.query;

    if (!idProveedor) {
        res.send("Envie el idProveedor de la persona");
    }
    else {


        await ModeloProveedor.destroy({
            where:
            {
                idProveedor: idProveedor,
            }

        })

            .then((data) => {
                console.log(data);
                if (data == 0) {
                    res.send("El idProveedor no esta");
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