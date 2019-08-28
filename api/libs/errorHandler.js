
//JS file que validara los errores de que puede haber con la base de datos

const mongoose  = require('moongose');
const looger = require('../utils/logger');

function processarError (fn){
    return function (req, resp, next){
            fn(req,resp,next).catch(next);
        }
}

// nuevo CustomProductError
function processarErroresDeDB ( err, req, resp, next ){
    if(err instanceof mongoose.Error || err.name === 'MongoError'){
        looger.error(`Ocurrio un error en la DB`,err);
        err.message = 'Error en la DB';
        err.status = 500;
    }
    next(err);
}

function catchResolver(err, resp){
    resp.status(err.status).send(err.message);
}

module.exports = {
    processarError,
    processarErroresDeDB,
    catchResolver
}
