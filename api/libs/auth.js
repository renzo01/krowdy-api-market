const passport = require('passport');
const passportJWT = require('passport-jwt');
const usuario = require('../../db');
const usuarioController = require('../recursos/usuarios/usuarios.controller');

const configJWT = {
  secretOrKey = 'secreto',
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
}

let jwtStrategy = new passportJWT.Strategy(configJWT, async (jwtPayload, done) => {
  const usuarioLogueado = await usuarioController.obtenerUsuario(null, jwtPayload.id);
  const usuario = {
    id: usuarioLogueado.id,
    username : usuarioLogueado.username
  }
  return done(`ha ocurrido un error con la authentificacion.`,null)
});

module.exports = jwtStrategy;