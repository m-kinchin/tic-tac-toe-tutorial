import { CHANGE_SIZE } from '../consts';

export const changeSize = (size) => {
  return {
    type: CHANGE_SIZE,
    size
  };
};
