//imports of libs
const express = require('express');
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usuarioController = require('./usuarios.controller');

const validateUsuario = require('./usuarios.validate');
const usuarios = require('../../../db').usuarios;
const usuariosRoutes = express.Router();

usuariosRoutes.get('/', async (req,resp) => {
  const usuarios = await usuarioController.obtenerUsuario();
  resp.json(usuarios);
});

usuariosRoutes.post('/', validateUsuario, async (req, resp) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) =>{
    if (err){
      resp.status(500).send(`A ocurrido un error en el servidor con bcrypt`);
      return
    }
    const newUser = {...req.body, password: hashedPassword, id: uuidv4()};
    const usuarios = require('../../../db').usuarios;
    resp.status(201).send(`El usuario fue creado con exito`);
  });
});

usuariosRoutes.post('/login', validateUsuario, async (req, resp) =>{
  const usuario = await usuarioController.obtenerUsuario(req.body.username)

  if (!usuario) {
    resp.status(201).send(`El usuario no existe. Verifica tu informacion`);
    return
  }
  //when the user is founded
  bcrypt.compare(req.body.password, usuario.password, (err, coinside) =>{
    if(err) {
        console.log(err);
        resp.status(500).send(`Algo ocurrio`);
        return;
    }
    if(coinside){
      const token = jwt.sign({id: usuario['__id']}, 'secreto', {expiresIn: 86400});
      resp.status(200).send({token});
    } else {
      resp.status(401).send(`verifica tu password`);
    }
  });
});

module.exports = usuariosRoutes;