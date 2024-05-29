const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const PORT =  3000;

const cards = require('./cards');
const sessions = require('./sessions');
const users = require('./users');
const scores = require('./scores');

app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());

// Sessions
app.get('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

app.post('/api/v1/session', (req, res) => {
  const { username } = req.body;

  if(!users.isValid(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if(username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);

  if(!existingUserData) {
    const newUserData = {
      cardList: cards.makeCardList(),
      scoreList: scores.makeScoreList()
    };
    users.addUserData(username,newUserData);
  }

  res.cookie('sid', sid);
  res.json(users.getUserData(username).cardList.getCards());
});

app.delete('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(sid) {
    res.clearCookie('sid');
  }

  if(username) {
    sessions.deleteSession(sid);
  }
  res.json({ username });
});

// Cards
app.get('/api/v1/cards', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(users.getUserData(username).cardList.getCards());
});

app.get('/api/v1/cards/test', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(users.getUserData(username).cardList.getTestCards());
});

app.post('/api/v1/cards', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { question } = req.body;
  if(!question) {
    res.status(400).json({ error: 'required-question' });
    return;
  }
  const cardList = users.getUserData(username).cardList;
  const id = cardList.addCard(question);
  res.json(cardList.getCard(id));
});

app.get('/api/v1/cards/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const cardList = users.getUserData(username).cardList;
  const { id } = req.params;
  if(!cardList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No card with id ${id}` });
    return;
  }
  res.json(cardList.getCard(id));
});

app.put('/api/v1/cards/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const cardList = users.getUserData(username).cardList;
  const { id } = req.params;
  const { question, addToTest = false } = req.body;

  if(!question) {
    res.status(400).json({ error: 'required-question' });
    return;
  }
  if(!cardList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No card with id ${id}` });
    return;
  }
  cardList.updateCard(id, { question, addToTest });
  res.json(cardList.getCard(id));
});

app.patch('/api/v1/cards/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const { question, addToTest } = req.body;
  const cardList = users.getUserData(username).cardList;
  if(!cardList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No card with id ${id}` });
    return;
  }
  cardList.updateCard(id, { question, addToTest });
  res.json(cardList.getCard(id));
});

app.delete('/api/v1/cards/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const cardList = users.getUserData(username).cardList;
  const exists = cardList.contains(id);
  if(exists) {
    cardList.deleteCard(id);
  }
  res.json({ message: exists ? `card ${id} deleted` : `card ${id} did not exist` });
});

// Scores
app.get('/api/v1/scores', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(users.getUserData(username).scoreList.getScores());
});

app.post('/api/v1/scores', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { score, detail, time, date } = req.body;
  if(!score) {
    res.status(400).json({ error: 'required-score' });
    return;
  }
  const scoreList = users.getUserData(username).scoreList;
  const id = scoreList.addScore(score, detail, time, date);
  res.json(scoreList.getScore(id));
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));