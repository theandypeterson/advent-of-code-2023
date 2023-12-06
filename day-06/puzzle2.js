const fs = require('fs');

const filePath = 'records.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split('\n');
  console.log(lines)
  const times = [parseInt(lines[0].split(':')[1].split(' ').filter((x) => x !== '').join(''))];
  const distance = [parseInt(lines[1].split(':')[1].split(' ').filter((x) => x !== '').join(''))];
  console.log('times', times);
  console.log('distance', distance);
  const zipped = times.map((x, i) => [x, distance[i]]);
  console.log('zipped', zipped);


  const distances = zipped.map(([time, distance]) => {
    return extrapolateDistances(time).filter((x) => x > distance).length;
  });

  const summedDistances = distances.reduce((a, b) => a * b, 1);

  console.log('distances', summedDistances);
});

const determineDistanceForTime = (totalTime, timeToHold) => {
  const timeToRun = totalTime - timeToHold;
  const speed = timeToHold;

  return timeToRun * speed;
};

const extrapolateDistances = (time) => {
  return Array(time).fill(0).map((_x, i) => {
    return determineDistanceForTime(time, i);
  });
};

