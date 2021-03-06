function randInt(max, min = 0) {
  return Math.floor(Math.random() * max) + min;
}

function randomCardNumber(max = 8, min = 2) {
  const minNumber = Math.floor(Math.log2(min));
  const maxNumber = Math.floor(Math.log2(max));

  return Math.pow(2, randInt(maxNumber, minNumber));
}

function generateEmptyMap(rows, columns) {
  return Array(rows).fill(null).map(() => Array(columns).fill(null));
}

function putRandomCardOnMap(map, maxValue = DEFAULT_CONFIGURATION.maxCardValue) {
  const allEmptyCards = map.reduce((result, row, rIndex) => {
    const emptyCards = row
      .map((card, cIndex) => ({ row: rIndex, column: cIndex, value: card }))
      .filter(({ value }) => value === null);

    return result.concat(emptyCards);
  }, []);

  const emptyCard = allEmptyCards[randInt(allEmptyCards.length)];

  map[emptyCard.row][emptyCard.column] = randomCardNumber(maxValue);

  return map;
}

function fillMap(map, numberOfCards, maxValue) {
  return Array(numberOfCards).fill(null).reduce((newMap) => putRandomCardOnMap(newMap, maxValue), map);
}

const DEFAULT_CONFIGURATION = {
  numberOfRows: 4,
  numberOfElementsInRow: 4,
  maxCardValue: 4,
  numberOfNotEmptyCards: 2
};

function generateMap(options) {
  const config = Object.assign(DEFAULT_CONFIGURATION, options);
  const emptyMap = generateEmptyMap(config.numberOfRows, config.numberOfElementsInRow);

  return fillMap(emptyMap, config.numberOfNotEmptyCards, config.maxCardValue);
}

function transposeArray(array) {
  return array[0].map((col, i) => array.map(row => row[i]));
}

function squashRowLeft(row) {
  let prev = null;

  return row.reduce((newRow, value, index) => {
    if (value && value === prev) {
      newRow[index - 1] = 2 * value;
      newRow[index] = null;
      prev = null;
    } else {
      newRow[index] = value;
      prev = value;
    }

    return newRow;
  }, []);
}

function moveRowLeft(row) {
  const sort = row => row.sort((a, b) => a === null ? 1 : b === null ? -1 : 0);

  return sort(squashRowLeft(sort(row)));
}

function moveValuesLeft(array) {
  return array.map(moveRowLeft);
}

function moveValuesRight(array) {
  return array
    .map(row => row.reverse())
    .map(moveRowLeft)
    .map(row => row.reverse());
}

function moveElements(map, direction) {
  let newMap = map.slice();

  switch (direction) {
    case 'left':
      newMap = moveValuesLeft(newMap);
      break;

    case 'up':
      newMap = transposeArray(moveValuesLeft(transposeArray(newMap)));
      break;

    case 'right':
      newMap = moveValuesRight(newMap);
      break;

    case 'down':
      newMap = transposeArray(moveValuesRight(transposeArray(newMap)));
      break;
  }

  return areArraysEqual(newMap, map) ? newMap : putRandomCardOnMap(newMap);
}

function areArraysEqual(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  return array1.every(function (row, rIndex) {
    if (row.length !== array2[rIndex].length) {
      return false;
    }

    return row.every((card, cIndex) => card === array2[rIndex][cIndex]);
  });
}

function isAnyEmptySpace(map) {
  return map.some(row => row.some(card => card === null));
}

function isAnyHorizontalMove(map) {
  return map.some(row => {
    return row.reduce((result, val, i) => result || (val && val === row[i - 1]), false);
  })
}

function isAnyVerticalMove(map) {
  return isAnyHorizontalMove(transposeArray(map));
}

function isLost(map) {
  return !(isAnyEmptySpace(map) || isAnyHorizontalMove(map) || isAnyVerticalMove(map));
}

function isWin(map) {
  return map.some(row => row.some(card => card === 2048));
}

function debounceTimes(callback, times) {
  let counter = 0;
  let timer = null;

  return () => {
    counter += 1;
    clearTimeout(timer);

    if (counter >= times) {
      counter = 0;
      callback();
    } else {
      timer = setTimeout(() => counter = 0, 1000);
    }
  };
}

function runCheat(map) {
  const sortHorizontally = items => items.map(row => row.sort((a, b) => b - a));

  return transposeArray(sortHorizontally(transposeArray(sortHorizontally(map))));
}

export {
  generateMap,
  moveElements,
  isLost,
  isWin,
  debounceTimes,
  runCheat
};
