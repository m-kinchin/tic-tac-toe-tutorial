import { SQUARE_CLICKED } from '../consts';

export const cellClick = (id) => {
  return {
    type: SQUARE_CLICKED,
    id
  };
;
}