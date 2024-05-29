const uuid = require('uuid').v4;

function makeScoreList() {

  const scoreList = {};
  const scores = {};

  scoreList.getScores = function getScores() {
    return scores;
  };

  scoreList.addScore = function addScore(scoreData) {
    const id = uuid();
    scores[id] = {
      id,
      score: scoreData.score,
      detail: scoreData.detail,
      time: scoreData.time,
      date: scoreData.date,
    };
    return id;
  };

  scoreList.getScore = function getScore(id) {
    return scores[id];
  };

  scoreList.getHighestScore = function getHighestScore(){
    return scores[userId] ? Math.max(...scores[userId]) : undefined;
  };
  
  return scoreList;
};

module.exports = {
  makeScoreList,
};
