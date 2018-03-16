function calculateWinner(squares, size) {
  let win = true;
  if(squares[0] !== null) {
    for (var i = 1; i < size; i++) {
      if(squares[0] !== squares[(size + 1)* i] || squares[(size + 1)* i] === null) {
        win = false;
        break;
      }
    }
    if(win) {
      return squares[0];
    }
  }

  if(squares[size - 1] !== null) {
    win = true;
    for (var i = 1; i < size; i++) {
      if(squares[size - 1] !== squares[(size - 1) * (i + 1)] || squares[(size - 1) * (i + 1)] === null) {
        win = false;
        break;
      }
    }
    if(win) {
      return squares[size - 1];
    }
  }

  for (var i = 0; i < size; i++) {
    win = true;
    for (var j = 1; j < size; j++) {
      if(squares[i * size] !== squares[i * size + j] || (squares[i * size] === null || squares[i * size + j] === null)) {
        win = false;
        break;
      }
    }
    if(win) {
      return squares[i];
    }
    win = true;
    for (var j = 1; j < size; j++) {
      if(squares[i] !== squares[i + j * size] || (squares[i] === null || squares[i + j * size] === null)) {
        win = false;
        break;
      }
    }
    if(win) {
      return squares[i];
    }
  }

  return null;
}

module.exports = {
  calculateWinner: calculateWinner,
};
