const { Joi, Segments } = require('celebrate');

const urlPattern = /^((http|https):\/\/)(www\.)?([A-Za-z0-9.-]{1,256})\.[A-Za-z]{2,10}([-a-zA-Z0-9@:%_+.~#?&/=]{1,256})?$/;

const updateAvatarSchema = {
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().uri().regex(RegExp(urlPattern)).required(),
  }),
};

module.exports = updateAvatarSchema;
