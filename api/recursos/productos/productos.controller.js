const Producto = require('./productos.model');
const logger = require('../../utils/logger');

function crearProducto(producto) {
    return new Producto(producto).save();
}

function obtenerProductos() {

    return Producto.find({});

}

function obtenerProducto(id) {
    return Producto.findByID(id);
}
function obtenerStockDeUnProducto(id){
    const productoStock = Producto.findById(id);
    try{
        if(productoStock.stock > 0){
            return productoStock;
        }
    }catch (err){
        logger.info(`Este producto no tiene stock, pero igual te lo muestro`);
        return productoStock;
    }
}

function obtenerProductoPorTitulo(titulo){
    return Producto.find({titulo: /${titulo}/i});
}

function modificarProductos(id, producto) {
    return Producto.findOneAndUpdate({ __id: id }, {
        ...producto
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
    eliminarProducto,
    obtenerStockDeUnProducto,
    obtenerProductoPorTitulo
}
