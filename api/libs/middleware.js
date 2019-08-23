const productosController = require('../recursos/productos/productos.controller');
const logger = require('../utils/logger');


// try {
//     producto = await ;     
// }catch (err) {
//     logger.error(`Algo ocurrio en la db ${err}`);
// }
module.exports = async(req, resp, next) => {
    let producto
    const pr = await productosController.obtenerProducto(req.params.id)
    // .then(element => producto = element)
    console.log(pr,'hola')
    return(!req.user.username === producto.owner)?next(403): next()
}

