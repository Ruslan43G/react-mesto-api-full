const { Joi, Segments } = require('celebrate');

const cardIdSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi
      .string()
      .alphanum()
      .length(24)
      .hex()
      .required(),
  }),
};

module.exports = cardIdSchema;
