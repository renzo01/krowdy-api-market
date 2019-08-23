const passportJWT = require('passport-jwt');
const config = require('../../config');
const usuarioController = require('../recursos/usuarios/usuarios.controller');
const { secret } = config;
const configJWT = {
  secretOrKey: secret,
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
}

let jwtStrategy = new passportJWT.Strategy(configJWT, async (jwtPayload, next) => {
  try{
    const usuarioLogeado = await usuarioController.obtenerUsuario(null, jwtPayload.id);  
    next(null, {
      id: usuarioLogeado.id,
      username: usuarioLogeado.username,
    });
  } catch (err){
    logger.error(`Algo ocurrio en la db ${err}`);    
  }
});

module.exports = jwtStrategy;