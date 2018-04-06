import { combineReducers } from 'redux';

function squareClilck(state, action) {
  const len = state.history.length;
  if(state.history[len -1].squares[action.id].value || state.history[len -1].winner) {
    return state;
  }
  const newState = {...state};
  const history = newState.history;
  const newHistoryItem = {...history[len - 1], squares: history[len - 1].squares.slice()};
  newHistoryItem.squares[action.id] =  {
    value :newHistoryItem.xIsNext ? 'X' : 'O',
    className: newHistoryItem.squares[action.id].className
  };
  newHistoryItem.xIsNext = !newHistoryItem.xIsNext;
  const winLine = checkWinLine(newHistoryItem.squares, state.size);
  if(winLine) {
      newHistoryItem.winner = newHistoryItem.squares[action.id].value;
      for(var w = 0; w < winLine.length; w++) {
        newHistoryItem.squares[winLine[w]] = {value: newHistoryItem.squares[winLine[w]].value, className: "square-win"};
      }
  }
  return {...newState, history: [...history, newHistoryItem]};
}

function setSettings(state = {
  size: 3,
  movesSortDesc: false,
  history: [Array(9).fill({value: null, className: "square"})]
}, action) {
  switch (action.type) {
    case 'CHANGE_SIZE':
      state.size = action.size;
      state.history = historyTemplate;
      state.history[0].squares = Array(Math.pow(action.size, 2)).fill({value: null, className: "square"});
      return state;
    case 'CHANGE_ORDER':
      state.movesSortDesc = !state.movesSortDesc;
    default:
      return state;
  }
}

function backInHistory(state = [Array(9).fill({value: null, className: "square"})], action) {
  switch (action.type) {
    case 'BACK_IN_HISTORY':
      state = state.slice(0, action.moveNumber);
      return state;
    default:
      return state;
  }
}

function checkWinLine(squares, size) {
  let win = true;
  let winRoute = Array(size).fill(0);
  let firstItemId = 0;
  if(squares[firstItemId].value !== null) {
    winRoute[0] = firstItemId;
    for (let i = 1; i < size; i++) {
      const nextId = (size + 1) * i;
      if(squares[firstItemId].value !== squares[nextId].value || squares[nextId].value === null) {
        win = false;
        break;
      }
      winRoute[i] = nextId;
    }
    if(win) {
      return winRoute;
    }
  }

  if(squares[size - 1].value !== null) {
    win = true;
    firstItemId = size - 1;
    winRoute = Array(size).fill(0);
    winRoute[0] = firstItemId;
    for (let i = 1; i < size; i++) {
      const nextId = (size - 1) * (i + 1);
      if(squares[firstItemId].value !== squares[nextId].value || squares[nextId].value === null) {
        win = false;
        break;
      }
      winRoute[i] = nextId;
    }
    if(win) {
      return winRoute;
    }
  }

  for (let i = 0; i < size; i++) {
    win = true;
    firstItemId = i * size;
    winRoute = Array(size).fill(0);
    winRoute[0] = firstItemId;
    for (let j = 1; j < size; j++) {
      const nextId = i * size + j;
      if(squares[firstItemId].value !== squares[nextId].value || (squares[firstItemId].value === null || squares[nextId].value === null)) {
        win = false;
        break;
      }
      winRoute[j] = nextId;
    }
    if(win) {
      return winRoute;
    }
    win = true;
    firstItemId = i;
    winRoute[0] = firstItemId;
    for (let j = 1; j < size; j++) {
      const nextId = i + j * size;
      if(squares[firstItemId].value !== squares[nextId].value || (squares[firstItemId].value === null || squares[nextId].value === null)) {
        win = false;
        break;
      }
      winRoute[j] = nextId;
    }
    if(win) {
      return winRoute;
    }
  }
  return null;
}

const historyTemplate = [{
  xIsNext: true,
  winner: undefined,
  lastMoveCoord: {
    coll: null,
    row: null
  },
  moveCount: 0,
}];

const mainReducer = function(state = prefillState, action) {
  switch (action.type) {
    case 'BACK_IN_HISTORY':
      return backInHistory(state, action);
    case 'CHANGE_SIZE':
      return setSettings(state, action);
    case 'CHANGE_ORDER':
      return setSettings(state, action);
    case 'SQUARE_CLICKED':
      return squareClilck(state, action);;
    default:
      return state;
  }
}

const prefillState = {
  history: [{
    squares: Array(9).fill({value: null, className: "square"}),
    xIsNext: true,
    winner: undefined,
    lastMoveCoord: {
      coll: null,
      row: null
    },
    moveCount: 0,
  }],
  size: 3,
  movesSortDesc: false
};

// const reducers = combineReducers({
//   settings,
//   backInHistory,
//   squares
// });

export default mainReducer;