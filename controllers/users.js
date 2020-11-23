const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const InvalidDataError = require('../errors/invalid-data-error');

// создаем пользователя
module.exports.createUser = (req, res, next) => {
  if (req.body.password.length < 8) {
    throw new InvalidDataError('Длина пароля меньше 8 символов!');
  }
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const { email } = req.body;
      userModel.create({
        email,
        password: hash,
      })
        .then((user) => {
          res.send({
            email: user.email,
          });
        })
        .catch(next);
    });
};

// логин пользователя
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  userModel.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

// ищем пользователя
module.exports.findUser = (req, res, next) => {
  const id = req.user._id;
  userModel.findById(id)
    .orFail(() => { throw new NotFoundError('Пользователь с таким id не найден!'); })
    .then((user) => {
      res.send({ user });
    })
    .catch(next);
};

// показываем всех пользователей
module.exports.showAllUsers = (req, res, next) => {
  userModel.find({})
    .orFail(() => { throw new NotFoundError('пользователи не найдены'); })
    .then((users) => res.status(200).send(users))
    .catch(next);
};

// обновляем данные ползьзователя
module.exports.updateUserProfile = (req, res, next) => {
  const id = req.user._id;
  const { name, about } = req.body;
  userModel.findOneAndUpdate({ _id: id },
    { name, about },
    { new: true, runValidators: true })
    .orFail(() => { throw new InvalidDataError('Введены некорректные данные!'); })
    .then((user) => res.status(201).send(user))
    .catch(next);
};

// обновляем аватар ползьзователя
module.exports.updateUserAvatar = (req, res, next) => {
  const id = req.user._id;
  const { avatar } = req.body;
  userModel.findOneAndUpdate({ _id: id },
    { avatar },
    { new: true, runValidators: true })
    .orFail(() => { throw new InvalidDataError('Введены некорректные данные!'); })
    .then((user) => res.status(201).send(user))
    .catch(next);
};
