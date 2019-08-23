const passport = require('passport');
const passportJWT = require('passport-jwt');
const usuario = require('../../db');
const usuarioController = require('../recursos/usuarios/usuarios.controller');

const configJWT = {
  secretOrKey = 'secreto',
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
}

let jwtStrategy = new passportJWT.Strategy(configJWT, async (jwtPayload, next) => {
  const usuarioLogueado = await usuarioController.obtenerUsuario(null, jwtPayload.id);
  next(null, {
    id: usuarioLogueado.id,
    username: usuarioLogueado.username
  });
});

module.exports = jwtStrategy;