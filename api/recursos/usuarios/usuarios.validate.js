const Joi = require('@hapi/joi');

// TODO: Agregar validaciones de JOI al Schema de usuario
const blueprintUsuario = Joi.object().keys({
  username: Joi.string().min(3).max(100).required().error(() => 'Error: '),
  password: Joi.string().min(3).max(15).required().error(() => 'Error: '),
});

module.exports = (req, res, next) => {
  const joiResult = Joi.validate(req.body, blueprintUsuario);
  let err = []
  let errorMessage = '';
  if (joiResult.error) { // TODO: Mejorar el mensaje de error.
    joiResult.error.details.forEach(element => {          
      err.push({message: element.message,type:element.type,context: element.context})
      errorMessage += `${element.message} ${element.context.label}, tipo de error: ${element.type}, el límite es: ${element.context.limit}, el valor a cambiar: ${element.context.value}\n`     
    })
    res.status(400).send(errorMessage);
    return
  }
  next();
}
