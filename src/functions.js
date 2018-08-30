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

function putRandomCardOnMap(map, maxValue = 2) {
  let row = randInt(map.length);
  let column = randInt(map[0].length);

  const numberOfElements = map.length * map[0].length;
  const value = randomCardNumber(maxValue);

  for (let attempt = 0; attempt < numberOfElements; attempt++) {
    if (map[row][column] === null) {
      map[row][column] = value;
      break;
    }

    column += 1;

    if (column >= map[0].length) {
      column = 0;
      row += 1;
    }

    if (row >= map.length) {
      row = 0;
    }
  }

  return map;
}

function fillMap(map, numberOfCards, maxValue) {
  putRandomCardOnMap(map, maxValue);
  putRandomCardOnMap(map, maxValue);
  putRandomCardOnMap(map, maxValue);

  return map;
}

const DEFAULT_CONFIGURATION = {
  numberOfRows: 4,
  numberOfElementsInRow: 4,
  maxCardValue: 2,
  numberOfNotEmptyCards: 10
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

export {
  generateMap,
  moveValuesLeft,
  moveValuesRight,
  transposeArray,
  putRandomCardOnMap
};
