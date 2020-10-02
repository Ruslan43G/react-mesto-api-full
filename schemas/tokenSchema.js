const { Joi, Segments } = require('celebrate');

const tokenSchema = {
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required().regex(/^Bearer /),
  }).unknown(true),
};

module.exports = tokenSchema;
