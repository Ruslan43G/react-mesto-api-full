const cardModel = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-error');

// ищем все карточки
module.exports.showAllCards = (req, res, next) => {
  cardModel.find({})
    .orFail(() => { throw new NotFoundError('Еще не создано ни одной карточки!'); })
    .then((cards) => res.send(cards))
    .catch(next);
};

// создаём карточку
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  cardModel.create({ name, link, owner })
    .then((newCard) => {
      res.send(newCard);
    })
    .catch(next);
};

// удаляем карточку
module.exports.deleteCard = (req, res, next) => {
  const owner = req.user._id;
  cardModel.findOne({ _id: req.params.cardId })
    .orFail(() => { throw new NotFoundError('Карточка не найдена'); })
    .then((card) => {
      if (String(card.owner) !== owner) {
        throw new ForbiddenError('Недостаточно прав!');
      }
      return cardModel.findByIdAndDelete(card._id);
    })
    .then((success) => res.send(success))
    .catch(next);
};
