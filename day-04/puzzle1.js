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
    cards.push(card);
  }

  const scores = cards.map((card) => {
    return getCardScore(card);
  });
  console.log('scores', scores);

  const finalScore = scores.reduce((acc, score) => acc + score, 0);
  console.log("Final score: ", finalScore);
});

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
