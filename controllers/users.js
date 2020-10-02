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
            name: user.name,
            about: user.about,
            avatar: user.avatar,
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
  userModel.findById(req.params.userId)
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
