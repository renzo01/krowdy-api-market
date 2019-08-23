const express = require('express');
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const logger = require('../../utils/logger');
const usuarioController = require('./usuarios.controller');
const validateUsuario = require('./usuarios.validate');
const usuariosRoutes = express.Router();
const config = require('../../../config');

const { secret } = config;
usuariosRoutes.get('/', async (req, res) => {
  try{
    const usuarios = await usuarioController.obtenerUsuarios();
    logger.info('Se obtuvo todos los usuarios');
    return res.json(usuarios);
  } catch (err) {
    logger.error(`Algo ocurrio en la db ${err}`);
    return res.status(500).send(`Algo ocurrio en la db.`);
  }
});

usuariosRoutes.post('/', validateUsuario, async (req, res) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      logger.error(`A ocurrido un error en el servidor con bcrypt ${err}`);
      res.status(500).send(`A ocurrido un error en el servidor con bcrypt`);
      return
    }
    // todo hacer catch
    try{
      const newUser = { ...req.body, password: hashedPassword, id: uuidv4() };
      const buscarUsuario = await usuarioController.obtenerUsuario(req.body.username)
      if(!buscarUsuario){        
        const usuario = await usuarioController.crearUsuario(newUser);
        logger.info(`El usuario fue creado con exito.${usuario.username}`);
        return res.status(201).send(`El usuario fue creado con exito.`);
        
      }  
      logger.warn(`El usuario ${buscarUsuario.username} ya existe`);
      return res.status(403).send(`El usuario ${buscarUsuario.username} ya existe`);
    }catch (err) {
      logger.error(`Algo ocurrio en la db ${err}`);
      return res.status(500).send(`Algo ocurrio en la db.`);
    }    
  });

});

usuariosRoutes.post('/login', validateUsuario, async (req, res) => {
  try{
    const usuario = await usuarioController.obtenerUsuario(req.body.username)
    logger.info(`se obtuvo el usuario correctamente`);
    if (!usuario) {
      logger.warn(`El usuario no existe. Verifica tu informacion.`);
      res.status(404).send(`El usuario no existe. Verifica tu informacion.`);
      return;
    }
    
    bcrypt.compare(req.body.password, usuario.password, (err, coincide) => {
      if (err) {
        logger.error(`error con bcrypt${err}`);
        res.status(500).send(`Algo ocurrio ups!`);
        return;
      }
      
      if (coincide) { 
        const token = jwt.sign({id: usuario['_id']}, secret, { expiresIn: 86400 });
        logger.info(`la autenticación fue correcta`);
        return res.status(200).send({token});
      } else {
        logger.warn(`Verifica el password`);
        return res.status(401).send(`Verifica tu password.`);
      }
    });
  }catch (err) {
    logger.error(`Algo ocurrio en la db ${err}`);
    return res.status(500).send(`Algo ocurrio en la db.`);
  }
})

module.exports = usuariosRoutes;