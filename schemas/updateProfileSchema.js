const { Joi, Segments } = require('celebrate');

const updateProfileSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2),
    about: Joi.string().min(2),
  }),
};

module.exports = updateProfileSchema;
