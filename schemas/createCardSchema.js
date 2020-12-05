const { Joi, Segments } = require('celebrate');

const urlPattern = /^((http|https):\/\/)(www\.)?([A-Za-z0-9.-]{1,256})\.[A-Za-z]{2,10}([-a-zA-Z0-9@:%_+.~#?&/=]{1,256})?$/;

const createCardSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    link: Joi.string().uri().regex(RegExp(urlPattern)).required(),
  }),
};

module.exports = createCardSchema;
