const Producto = require('./productos.model');

function crearProducto(producto) {
    return new Producto(producto).save();
}

function obtenerProductos() {
    return Producto.find({});
}

function obtenerProducto(id) {
    return Producto.findByID(id);
}

function modificarProductos(id, productos) {
    return Producto.findOneAndUpdate({ __id: id }, {
        ...Producto
    }, { new: true });
}

function eliminarProducto(id){
    return Producto.findOneAndDelete(id);
}
//export for using in other part of this proyect
module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    modificarProductos,
    eliminarProducto
}
