//allows to showing what information have the state in this moment
const winston = require('winston');

const logger = new (winston.Logger)({
  transports: [
    new winston.transports.File({
      level: 'info',
      //for not returnd and Json file
      json: false,
      handleExceptions: true,
      maxsize : 512000,
      maxFiles: 5,
      filename: `${__dirname}/../../logs-de-aplicacion.log`,
      prettyPrint: object => {return JSON.stringify(object)}
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
      prettyPrint: object => {return JSON.stringify(object)}
    })
  ]
});

module.exports = logger;