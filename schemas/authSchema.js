const { Joi, Segments } = require('celebrate');

const authSchema = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
};

module.exports = authSchema;
