import { BACK_IN_HISTORY, CHANGE_ORDER } from '../consts';

export const backInHistory = (moveIndex) => {
  return {
    type: BACK_IN_HISTORY,
    moveIndex
  };
};

export const reorderMoves = () => {
  return {
    type: CHANGE_ORDER
  };
};
