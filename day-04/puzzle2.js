const fs = require('fs');

const filePath = 'cards.txt';

const cards = [];
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Process the file data here
  console.log(data);
  for (const cardData of data.split('\n')) {
    const winningNumbers = cardData.split('|')[0].split(':')[1].trim().split(' ');
    const myNumbers = cardData.split('|')[1].trim().split(' ');
    console.log(winningNumbers, myNumbers);
    const card = {
      winningNumbers,
      myNumbers,
    };
    card.numberOfMatches = getMatchingNumbers(card).length;
    cards.push(card);
  }

  const score = cards.reduce((acc, card, i) => acc + scoreCard(cards, i), 0);
  console.log('score', score);
});

const scoreCard = (cards, cardIndex) => {
  const card = cards[cardIndex];
  if (!card) {
    return 0;
  }

  const scoresForOtherCards = Array(card.numberOfMatches).fill(0).map((_, index) => scoreCard(cards, cardIndex + index + 1));
  return scoresForOtherCards.reduce((acc, score) => acc + score, 1);
}

const getMatchingNumbers = (card) => {
  return card.myNumbers.filter((num) => card.winningNumbers.includes(num)).filter((num) => num !== '');
}

const getCardScore = (card) => {
  const matchingNumbers = getMatchingNumbers(card);
  console.log('matchingNumbers', matchingNumbers);
  if (matchingNumbers.length === 0) {
    return 0;
  }
  else if (matchingNumbers.length === 1) {
    return 1;
  }
  let score = 1;
  for (let i = 2; i <= matchingNumbers.length; i++) {
    score = score * 2;
  }
  return score;
}
