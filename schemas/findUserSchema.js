const { Joi, Segments } = require('celebrate');

const findUserSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi
      .string()
      .alphanum()
      .length(24)
      .hex(),
  }),
};

module.exports = findUserSchema;
