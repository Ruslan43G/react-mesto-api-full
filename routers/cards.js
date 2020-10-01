const card = require('express').Router();
const { celebrate } = require('celebrate');

const { showAllCards, createCard, deleteCard } = require('../controllers/cards');

const createCardSchema = require('../schemas/createCardSchema');
const deleteCardSchema = require('../schemas/deleteCardSchema');

// Запрос показывает все карточки
card.get('/', showAllCards);
// запрос на создание новой карточки
card.post('/', celebrate(createCardSchema), createCard);
// запрос на удаление карточки
card.delete('/:cardId', celebrate(deleteCardSchema), deleteCard);

module.exports = card;
