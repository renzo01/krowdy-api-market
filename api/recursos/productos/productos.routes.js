const express = require('express');
const uuidv4 = require('uuid/v4');
const passport = require('passport');

const tokenValidate = require('../../libs/tokenValidate');
const validateProducto = require('../productos/productos.validate');
const productoController = require('../productos/productos.controller');
const productos = require('../../../db').productos;

const jwtAuthenticate = passport.authenticate('jwt', {session: false})

const productsRoutes = express.Router();

const logger = require('../../utils/logger');

productsRoutes.get('/', jwtAuthenticate, (req, resp) =>{
  console.log(req.user);
  logger.info('Se obtuvo todos los productos');
  productoController.obtenerProductos().then((productos) => {
    resp.json(productos);
  }).catch((err) => {
    resp.status(500).send('Algo ocurrio en la db');
  })
});
//When do you want to use 2 middleware
productsRoutes.post('/', [jwtAuthenticate, validateProducto], (req, resp) => {
  const productoNuevo = { ...req.body, owner: req.user.username };

  productoController.crearProducto(productoNuevo).then((productos) =>{
    //add a product
    productos.push(productos);
    resp.status(201).json(productos);
  }).catch((err) => {
    logger.error(`Algo ocurrio en la db`);
  })
});

productsRoutes.get('/:id', async (req,resp) => {
  try{
    const producto = await productoController.obtenerProducto(req.params.id);
    logger.info(`Se obtuvo el producto con id ${producto.id}`);
    resp.json(producto);
  }catch (err){
    console.log(err);
    resp.status(500).send(`Ocurrio algo en la db`);
  }
});

productsRoutes.delete('/:id', async (req, resp) =>{
  const id = req.param.id;
  try {
    const productoEliminado = await productoController.eliminarProducto(id);
  } catch (err){
    resp.status(500).send(`Ocurrio un error en la db`);
  }
});

module.exports = productsRoutes;
