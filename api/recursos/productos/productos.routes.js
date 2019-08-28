/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const uuidv4 = require('uuid/v4');
const passport = require('passport');

const tokenValidate = require('../../libs/tokenValidate');
const validateProducto = require('../productos/productos.validate');
const productoController = require('../productos/productos.controller');
const ProductoNoExiste  = require('../productos/productos.error').ProductoNoExiste;
const productos = require('../../../db').productos;

const jwtAuthenticate = passport.authenticate('jwt', {session: false})

const productsRoutes = express.Router();

const logger = require('../../utils/logger');

// /productos/productos
productsRoutes.get('/', jwtAuthenticate, (req, res) => {
  
  console.log(req.user);
  logger.info('Se obtuvo todos los §productos');
  productoController.obtenerProductos()
  .then((productos) => {
    res.json(productos);
  })
  .catch((err) => {
    logger.error(`Ocurrio un error al obtener productos ${err}`);
    res.status(500).send(`fallo con los productos (get)`);
  })
});

productsRoutes.post('/',[tokenValidate, validateProducto], (req, resp) =>{
  const productoNuevo = { ...req.body, owner: req.user.username};

  productoController.crearProducto(productoNuevo).then((producto)=>{
    productos.push(producto);
    res.status(201).json(producto);
  })
  .catch((err) => {
    logger.error(`ocurrio un error en la db ${err}`);
    res.status(500).send(`ocurrio un error`);
  })
});

/* productoController.crearProducto(productoNuevo).then((productos) => {
    //add a product
    productos.push(productos);
    resp.status(201).json(productos);
  }).catch((err) => {
    logger.error(`Algo ocurrio en la db`);
  }); */

productsRoutes.get('/:id', async (req,resp) => {
  //obtener el id del producto al cual se quiere actualizar
  const id = req.params.id;
  return productoController.obtenerProducto(id).then((producto) =>{
      if(!producto) throw new ProductoNoExiste(`El producto con el id ${id}, no existe`);
      resp.json(producto);
    })
    logger.info(`se obtubo el producto con el id ${producto.id}`);
    resp.json(producto);
});

productsRoutes.put('/:id', validateProducto, async (req, res) => {
  const id = req.params.id;
  try {
    const productoModificado = await productoController.modificarProducto(id, req.body);
    logger.info(`Se han cambiado la informacion del producto`);
    res.json(productoModificado);
  } catch (err) {
    res.status(500).send(`Error en la db.`)
  }
});

productsRoutes.delete('/:id', async (req, resp) =>{
  const id = req.param.id;
  try {
    const productoEliminado = await productoController.eliminarProducto(id);
    logger.warn(`Se ha eliminado un producto.`);
    res.json(productoEliminado);
  } catch (err) {
    res.status(500).send(`Ocurrio un error en la db.`); 
  }
});

module.exports = productsRoutes;
