const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const NotAuthorizedError = require('../errors/not-authorized-error');

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    minlength: 3,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Введите корректный email',
    },
  },
  password: {
    required: true,
    type: String,
    minlength: 8,
    select: false,
  },
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    required: true,
    type: String,
    validate: {
      validator(v) {
        return /^((http|https):\/\/)(www\.)?([a-zA-Z0-9\W]{1,})(#)?$/.test(v);
      },
      message: 'Введите корректную ссылку!',
    },
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotAuthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new NotAuthorizedError('Неправильные почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
