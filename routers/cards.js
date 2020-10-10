const card = require('express').Router();
const { celebrate } = require('celebrate');

const { showAllCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');

const createCardSchema = require('../schemas/createCardSchema');
const deleteCardSchema = require('../schemas/deleteCardSchema');
const cardIdSchema = require('../schemas/cardIdSchema');

// Запрос показывает все карточки
card.get('/', showAllCards);
// запрос на создание новой карточки
card.post('/', celebrate(createCardSchema), createCard);
// запрос на удаление карточки
card.delete('/:cardId', celebrate(deleteCardSchema), deleteCard);
// запрос лайк карточки
card.put('/:cardId/likes', celebrate(cardIdSchema), likeCard);
// запрос удалить лайк
card.delete('/:cardId/likes', celebrate(cardIdSchema), dislikeCard);

module.exports = card;
