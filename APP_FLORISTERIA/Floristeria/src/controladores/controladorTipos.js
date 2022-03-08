const ModeloTipo = require('../modelos/modeloTipo');
exports.Raiz = (req, res) => {
    res.send("Esto es el inicio del modulo de tipos");
};
exports.listarTipos = async(req, res) => {
    const listaTipos = await ModeloTipo.findAll();
    if(listaTipos.lenght == 0){
        res.send("No hay datos todavia");
    }
    else{
        res.json(listaTipos);
    }
};
exports.guardar = async (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
        res.send("Debe enviar datos completos");
    }
    else {
        await ModeloTipo.create({
            nombre: nombre,
            
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
};
exports.modificarnombre = async (req, res) => {
    console.log(req.query);
    console.log(req.body);
    const { id } = req.query;
    const { nombre } = req.body;
    if (!id || !nombre || !apellido ) {
        res.send("Envie los datos completos");
    }
    else {
        var buscartipo = await ModeloTipo.findOne({
            where: {
                id: id,
            }
        });
        if (!buscartipo) {
            res.send("El id no esta");
        }
        else {
            console.log(buscartipo.nombre);
            buscartipo.nombre = nombre;
            buscartipo.activo = activo;
            buscartipo.imagen = imagen;
            await buscartipo.save()
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
    res.send("Registro actualizado");
};

exports.modificarimagen = async (req, res) => {
    console.log(req.query);
    console.log(req.body);
    const { id } = req.query;
    const { imagen } = req.body;
    if (!id || !imagen ) {
        res.send("Envie los datos completos");
    }
    else {
        var buscartipo = await ModeloTipo.findOne({
            where: {
                id: id,
            }
        });
        if (!buscartipo) {
            res.send("El id no esta");
        }
        else {
            console.log(buscartipo.nombre);
            buscartipo.nombre = nombre;
            buscartipo.activo = activo;
            buscartipo.imagen = imagen;
            await buscartipo.save()
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
    res.send("Registro actualizado");
};

exports.eliminar = async (req, res) => {

    const { id } = req.query;

    if (!id) {
        res.send("Envie el id de la persona");
    }
    else {


        await ModeloTipo.destroy({
            where:
            {
                id: id,
            }

        })

            .then((data) => {
                console.log(data);
                if (data == 0) {
                    res.send("El id no esta");
                }
                else {
                    res.send("Registro eliminado");
                }
                res.send("Registro eliminado");
            })
            .catch((error) => {
                console.log(error);
                res.send("Error al eliminar los datos");
            })

    }

};