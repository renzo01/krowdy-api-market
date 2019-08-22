const passport = require('passport');
const passportJWT = require('passport-jwt');
const usuarios = require('../../db').usuarios;

const configJWT = {
  secretOrKey: 'secreto',
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
}

let jwtStrategy = new passportJWT.Strategy(configJWT, (jwtPayload, done) => {
  const usuarioLogeado = usuarios.filter(usuario => usuario.id === jwtPayload.id)
  console.log(usuarioLogeado)
  const usuario = {
    id: usuarioLogeado.id,
    username: usuarioLogeado.username,
  }
  
  return done(null, 'hola');
})

module.exports = jwtStrategy;