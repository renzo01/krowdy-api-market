//imports of lib's necesaries
const express = require('express');
const bodyParser = require('body-parser');
const morgan  = require('morgan');
//this functionality is for using a authentification strategy
const passport = require('passport');
//this lib use some functions of mongoDB
const mongoose = require('mongoose');
//imports of own component
const logger = require('./api/utils/logger');
const productRouter = require('./api/recursos/productos/productos.routes');
const usuarioRouter = require('./api/recursos/usuarios/usuarios.routes');
const authJWT = require('./api/libs/auth');
const errorHandler = require('./api/libs/errorHandler');
const app = express();
//in this part we connect with the monogodb
mongoose.connect('mongodb://://root:training@172.31.23.49:27017/training?authSource=admin', { useNewUrlParser: true });
mongoose.connection.on('error', (error) =>{
  logger.error('Fallo la conexion!');
  logger.error(error);
  process.exit(1); //close conection
})
//comvert all in Json Type
app.use(bodyParser.json());

app.use(morgan('short',{
  stream: {
    //write a message of the status of the connection
    write: message => logger.info(message.trim())
  }
}));
app.use(passport.initialize());


app.use('/usuarios', usuariosRouter);
app.use('/productos', productRouter);

app.use(errorHandler.procesarErroresDeDB);
app.use(errorHandler.catchResolver);


passport.use(authJWT);
//when someone stay in this endpoint 
app.get('/',(request, response) => {
  logger.error('Se hizo peticion al /');
  response.send('Hello World');
});
//message what show if the connection is on 
app.listen(8080, () => {
  console.log('Init Server')
});