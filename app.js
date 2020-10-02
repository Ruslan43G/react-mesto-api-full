require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { celebrate, errors } = require('celebrate');

const user = require('./routers/users');
const cards = require('./routers/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found-err');
const authSchema = require('./schemas/authSchema');
const tokenSchema = require('./schemas/tokenSchema');

const app = express();

mongoose.connect('mongodb://localhost:27017/mesto', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// задаем порт
const { PORT = 3000 } = process.env;

// подключаем мидлвэр bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// логгер запросов
app.use(requestLogger);

// краш-тест
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// роуты для пост запросов регистрация и логин
app.post('/signup', celebrate(authSchema), createUser);
app.post('/signin', celebrate(authSchema), login);

// используем миддлвэр для защиты роутов
app.use(celebrate(tokenSchema), auth);

// используем роутинг для запросов
app.use('/users', user);
app.use('/cards', cards);

// используем при ошибочном адресе
app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

// логгер ошибок
app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());

// обработчик ошибок
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.name === 'ValidationError') {
    return res.status(401).send({ message: 'Введены некорректные данные!' });
  }
  if (err.code === 11000) {
    return res.status(409).send({ message: 'Пользователь с таким email уже зарегистрирован!' });
  }
  return res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

// запускаем сервер
app.listen(PORT, () => {
  console.log('Шалом, мир!');
});
