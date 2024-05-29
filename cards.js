const uuid = require('uuid').v4;

function makeCardList() {
  const id1 = uuid();
  const id2 = uuid();

  const cardList = {};
  const cards = {
    [id1]: {
      id: id1,
      question: 'What is the difference between GET and POST HTTP methods?',
      addToTest: true,
    },
    [id2]: {
      id: id2,
      question: 'What are web sockets?',
      addToTest: false,
    },
  };

  cardList.contains = function contains(id) {
    return !!cards[id];
  };

  cardList.getCards = function getCards() {
    return cards;
  };

  cardList.getTestCards = function getTestCards() {
    return Object.values(cards).filter(card => card.addToTest);
  };

  cardList.addCard = function addCard(question) {
    const id = uuid();
    cards[id] = {
      id,
      question,
      addToTest: false,
    };
    return id;
  };

  cardList.getCard = function getCard(id) {
    return cards[id];
  };

  cardList.updateCard = function updateCard(id, card) {
    cards[id].addToTest = card.addToTest ?? cards[id].addToTest;
    cards[id].question = card.question || cards[id].question;
  };

  cardList.deleteCard = function deleteCard(id) {
    delete cards[id];
  };
  
  return cardList;
};

module.exports = {
  makeCardList,
};