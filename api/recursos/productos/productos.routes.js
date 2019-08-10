const express = require('express');
const uuidv4 = require('uuid/v4');
const validateProducto = require('./productos.validate');
const productos = require('../../../db').productos;

const passport = require('passport')
const jwtAuthenticate = passport.authenticate('jwt', { session: false });


const productsRoutes = express.Router();

const logger = require('../../utils/logger');

// /productos/productos
productsRoutes.get('/', (req, res) => {
  logger.info('Se obtuvo todos los productos');
  res.json(productos);
});

productsRoutes.post('/', [jwtAuthenticate, validateProducto], (req, res) => {
  
  const productoNuevo = { ...req.body, owner: req.user.username };
  
  productoController.crearProducto(productoNuevo)
  .then((producto) => {
    productos.push(producto);
    res.status(201).json(producto);
  })
  .catch((error) => {
    logger.error('Algo ocurrio en la db.')
  })
});

productsRoutes.get('/:id', (req, res) => {
  // TODO: Implementar el 404
  let productoFilter;
  productos.forEach(producto => {
    if (producto.id === req.params.id) {
      productoFilter = producto;
    }
  });
  logger.info(`Se obtuvo el producto con id ${productoFilter.id}`);
  // productos.filter(producto => producto.id === req.params.id);
  res.json(productoFilter);
});

productsRoutes.put('/:id', validateProducto, async (req, res) => {
  const id = req.params.id;
  let index;
  let productoFilter;
  productos.forEach((producto, i) => {
    if (producto.id === id) {
      index = i;
      productoFilter = producto;
    }
  });
  logger.info(`Se ha actulizado un producto de cod: ${productoFilter.id}`)
  productos[index] = { ...productoFilter, ...req.body };
  res.json(productos[index]);
});

productsRoutes.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const name = req.params.titulo;

  let index;
  let productoFilter;
  productos.forEach((producto, i) => {
    if (producto.id === id) {
      producto.titulo === name;
      index = i;
      productoFilter = producto;
    }
    logger.warn(`Se ha borrado un producto : ${productoFilter.id}; ${productoFilter.name}`)
    
  });
    
  productos.splice(index, 1);
  res.json(productoFilter);
});
//hola masco
module.exports = productsRoutes;
