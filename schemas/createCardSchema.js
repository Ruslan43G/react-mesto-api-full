const { Joi, Segments } = require('celebrate');

const urlPattern = /^((http|https):\/\/)(www\.)?([a-zA-Z0-9\W]{1,})(#)?$/;

const createCardSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    link: Joi.string().uri().regex(RegExp(urlPattern)).required(),
  }),
};

module.exports = createCardSchema;
