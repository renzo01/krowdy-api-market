const express = require('express');
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const usuarioController = require('./usuarios.controller');

const validateUsuario = require('./usuarios.validate');
const usuarios = require('../../../db').usuarios;
const logger = require('../../utils/logger');
const usuariosRoutes = express.Router();


usuariosRoutes.get('/', async (req, res) => {
  const usuarios = await usuarioController.obtenerUsuarios();
  logger.info(`Se hizo la peticion de mostrar los usuarios`);
  res.json(usuarios);
});

usuariosRoutes.post('/', validateUsuario, async (req, res) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      // logger.info(error)
      logger.error(`ha ocurrido un error con la encriptacion`);
      res.status(500).send(`A ocurrido un error en el servidor con bcrypt`);
      return
    }
    const newUser = { ...req.body, password: hashedPassword, id: uuidv4() };
    const usuario = await usuarioController.crearUsuario(newUser);
    res.status(201).send(`El usuario fue creado con exito.`);
  });

});

usuariosRoutes.post('/login', validateUsuario, async (req, resp) =>{
  const usuario = await usuarioController.obtenerUsuario(req.body.username)

  if (!usuario) {
    logger.info(`No se ha encontrado al usuario solicitado`);
    res.status(404).send(`El usuario no existe. Verifica tu informacion.`);
    return;
  }
  
  bcrypt.compare(req.body.password, usuario.password, (err, coincide) => {
    if (err) {
      console.log(err);
      logger.error(`La contraseña no coinside`);
      res.status(500).send(`Algo ocurrio ups!`);
      return;
    }
    if(coinside){
      const token = jwt.sign({id: usuario['__id']}, 'secreto', {expiresIn: 86400});
      resp.status(200).send({token});
    } else {
      res.status(401).send(`Verifica tu password.`);
    }
  });
})

module.exports = usuariosRoutes;