const user = require('express').Router();
const { celebrate } = require('celebrate');

const { findUser, showAllUsers } = require('../controllers/users');
const findUserSchema = require('../schemas/findUserSchema');

// Запрос на поиск всех юзеров
user.get('/', showAllUsers);
// Поиск юзера по id
user.get('/:userId', celebrate(findUserSchema), findUser);

module.exports = user;
