const user = require('express').Router();
const { celebrate } = require('celebrate');

const {
  findUser,
  showAllUsers,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');
const findUserSchema = require('../schemas/findUserSchema');
const updateProfileSchema = require('../schemas/updateProfileSchema');
const updateAvatarSchema = require('../schemas/updateAvatarSchema');

// Запрос на поиск всех юзеров
user.get('/', showAllUsers);
// Поиск юзера по id
user.get('/me', findUser);
// Обновление данных пользователя
user.patch('/me', celebrate(updateProfileSchema), updateUserProfile);
// Обновление аватара
user.patch('/me/avatar', celebrate(updateAvatarSchema), updateUserAvatar);

module.exports = user;
