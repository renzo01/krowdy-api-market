const passportJWT = require('passport-jwt');
const usurioController = require('../recursos/usuarios/usuarios.controller');
const secret = require('../../config').secret;
const logger = require('../utils/logger');

const configJWT = {
    //permite setear una forma de encriptacion mediante una cadena 
    secretOrKey: secret,
    //solo toma la autentificacion mediante un token que debe ponerse en el header
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
}

let jwtStreategy = new passportJWT.Strategy(configJWT, async (jwtPaylad, next) =>{
    try{
        const usuarioLogueado = await usurioController.obtenerUsuario(null,jwtPaylad.id);
        next(null,{
            id: usuarioLogueado.id,
            username: usuarioLogueado.username
        });
    }
    catch(err){
        logger.error(`Algo paso en la db ${err}`);
    }
});
module.exports = jwtStreategy;