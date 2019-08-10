const Joi = require('@hapi/joi');

// TODO: Agregar validaciones de JOI al Schema de usuario
const blueprintUsuario = Joi.object().keys({
  username: Joi.string().alphanum().required(),
  password: Joi.string().min(6).required(),
});

module.exports = (req, res, next) => {
  const joiResult = Joi.validate(req.body, blueprintUsuario);
  if (joiResult.error) { // TODO: Mejorar el mensaje de error.
    res.status(400).send(`Has tenido un error en: ${joiResult.error}`);
    return;
  }
  next();
}
