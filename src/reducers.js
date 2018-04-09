import { 
  SQUARE_CLICKED,
  CHANGE_SIZE,
  CHANGE_ORDER,
  BACK_IN_HISTORY,
  SQUARE_CLASS_NAME,
  SQUARE_WIN_CLASS_NAME,
  PREFILLED_STATE,
  HISTORY_TEMPLATE
} from './consts';

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

  const coll = (action.id + 1) % state.size;
  newHistoryItem.lastMoveCoord = {
    coll: coll ? coll : state.size,
    row: Math.ceil((action.id + 1) / state.size)
  };
  newHistoryItem.xIsNext = !newHistoryItem.xIsNext;

  const winLine = checkWinLine(newHistoryItem.squares, state.size);
  if(winLine) {
    newHistoryItem.winner = newHistoryItem.squares[action.id].value;
    for(var w = 0; w < winLine.length; w++) {
      newHistoryItem.squares[winLine[w]] = {value: newHistoryItem.squares[winLine[w]].value, className: SQUARE_WIN_CLASS_NAME};
    }
  }
  newState.history = [...history, newHistoryItem];
  return newState;
}

function setSettings(state, action) {
  switch (action.type) {
    case CHANGE_SIZE:
      const newState = {...state};
      newState.size = action.size;
      newState.history = HISTORY_TEMPLATE.slice();
      newState.history[0].squares = Array(Math.pow(action.size, 2)).fill({value: null, className: SQUARE_CLASS_NAME});
      return newState;
    case CHANGE_ORDER:
      return {...state, movesSortDesc: !state.movesSortDesc};
    default:
      return state;
  }
}

function backInHistory(state, action) {
  const newState = {...state};
  newState.history = newState.history.slice(0, action.moveIndex + 1);
  return newState;
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

const mainReducer = function(state = PREFILLED_STATE, action) {
  switch (action.type) {
    case BACK_IN_HISTORY:
      return backInHistory(state, action);
    case CHANGE_SIZE:
    case CHANGE_ORDER:
      return setSettings(state, action);
    case SQUARE_CLICKED:
      return squareClilck(state, action);
    default:
      return state;
  }
}

export default mainReducer;
