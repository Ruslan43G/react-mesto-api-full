const { Joi, Segments } = require('celebrate');

const urlPattern = /^((http|https):\/\/)(www\.)?([a-zA-Z0-9\W]{1,})(#)?$/;

const updateAvatarSchema = {
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().uri().regex(RegExp(urlPattern)).required(),
  }),
};

module.exports = updateAvatarSchema;
