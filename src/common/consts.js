export const SQUARE_CLICKED = 'SQUARE_CLICKED';
export const CHANGE_ORDER = 'CHANGE_ORDER';
export const CHANGE_SIZE = 'CHANGE_SIZE';
export const BACK_IN_HISTORY = 'BACK_IN_HISTORY';
export const SQUARE_CLASS_NAME = 'square';
export const SQUARE_WIN_CLASS_NAME = 'square-win';

export const PREFILLED_STATE = {
  history: [{
    squares: Array(9).fill({value: null, className: SQUARE_CLASS_NAME}),
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

export const HISTORY_TEMPLATE = [{
  xIsNext: true,
  winner: undefined,
  lastMoveCoord: {
    coll: null,
    row: null
  },
  moveCount: 0,
}];
