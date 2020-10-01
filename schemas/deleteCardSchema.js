const { Joi, Segments } = require('celebrate');

const deleteCardSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).required(),
  }),
};

module.exports = deleteCardSchema;