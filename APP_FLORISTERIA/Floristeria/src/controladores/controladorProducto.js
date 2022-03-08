const ModeloProducto = require('../modelos/modeloProducto');
const ModeloCategoria = require('../modelos/modeloCategoria');
const ModeloProveedor = require('../modelos/modeloProveedor');
const { validationResult } = require("express-validator");

exports.Raiz = (req, res) => {
    res.send("Inicio del modulo de productos.");
};

exports.listarProductos = async (req, res) => {
    const listaProductos = await ModeloProducto.findAll();
    if (listaProductos.lenght == 0) {
        res.send("No existen datos en el modulo de productos.");
    }
    else {
        res.json(listaProductos);
    }
};

//funcion para buscar en el modulo de categorias pasandole como parametro en estado
exports.buscarProductos = async (req, res) => {
    const estado = req.query.estado;
    const listaProductos = await ModeloProducto.findAll({
        where: {
            estado: estado,
        },
    });
    if (listaProductos.length == 0) {
        if(estado == 0){
            res.send("No existen datos en el modulo de productos con estado false.");
        }
        else{
            res.send("No existen datos en el modulo de productos con estado true.");
        }
    }
    else {
        res.json(listaProductos);
    }
};
exports.guardarProductos = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else {
        const { nombre, precio, stock, estado, idCategoria, idProveedor, imagen } = req.body;
        if (!nombre || !precio || !stock || !estado || !idCategoria || !idProveedor || !imagen) {
            res.send("Favor enviar los datos completos.");
        }
        else {
            const buscarCategorias = await ModeloCategoria.findOne({
                where:{
                    idCategoria: idCategoria,
                },
            });
            const buscarProveedor = await ModeloProveedor.findOne({
                where:{
                    idProveedor: idProveedor,
                },
            });
            console.log(buscarCategorias);
            console.log(buscarProveedor);
            if(!buscarCategorias){
                res.send("El id de la categoria no existe.");
            }
            else if(!buscarProveedor){
                res.send("El id del proveedor no existe.");
            }
            else{
                await ModeloProducto.create({
                    nombre: nombre,
                    precio: precio,
                    stock: stock,
                    estado: estado,
                    idCategoria: idCategoria,
                    idProveedor: idProveedor,
                    imagen: imagen,
                })
                .then((data) => {
                    console.log(data);
                    res.send("Registro almacenado.");
                })
                .catch((error) => {
                    console.log(error);
                    res.send("Error al guardar los datos.");
                })
            }
        }
    }
};

exports.modificarProductos = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else{
        const {idProducto} = req.query;
        const {nombre, precio, stock, estado, idCategoria, idProveedor, imagen} = req.body;
        if(!nombre || !precio || !stock || !estado || !idCategoria || !idProveedor || !imagen){
            res.send("Favor enviar los datos completos.");
        }else{
            var buscarProductos = await ModeloProducto.findOne({
                where:{
                    idProducto: idProducto,
                },
            });
            var buscarCategorias = await ModeloCategoria.findOne({
                where:{
                    idCategoria: idCategoria,
                },
            });
            var buscarProveedor = await ModeloProveedor.findOne({
                where:{
                    idProveedor: idProveedor,
                },
            });
            if(!buscarProductos){
                res.send("El id no existe.");
            }
            else if(!buscarCategorias){
                res.send("El id de categorias no existe.");
            }
            else if(!buscarProveedor){
                res.send("El id de proveedores no existe.");
            }
            else{
                console.log(buscarProductos.login);
                buscarProductos.nombre = nombre;
                buscarProductos.precio = precio;
                buscarProductos.stock = stock;
                buscarProductos.estado = estado;
                buscarProductos.idCategoria = idCategoria;
                buscarProductos.idProveedor = idProveedor;
                buscarProductos.imagen = imagen;

                await buscarProductos
                .save()
                .then((data) => {
                    console.log(data);
                    res.send("Producto modificado.");
                })
                .catch((error) => {
                    console.log(error);
                    res.send("Error al modificar el producto");
                })
            }
        }
    }   
};
exports.eliminarProductos = async (req, res) => {

    const { idProducto } = req.query;

    if (!idProducto) {
        res.send("Envie el id del producto que desea eliminar.");
    }
    else {
        var buscarProductos = await ModeloProducto.findOne({
            where:{
                idProducto: idProducto,
            },
        });
        if(!buscarProductos){
            res.send("El id del producto no existe.");
        }
        else {
            await ModeloProducto.destroy({
                where: {
                    idProducto: idProducto,
                }
            })
            .then((data) => {
                console.log(data);
                res.send("Registro eliminado.");
            })
            .catch((error) => {
                console.log(error);
                res.send("Error al eliminar el producto.");
            })
        }
    }

};