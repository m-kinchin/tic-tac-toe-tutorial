import React from 'react';

import '../styles/board-cell.css';

const BoardCell = (props) => {
  debugger;
  return (
    <div className={props.className} onClick={() => props.onCellClick(props.id)}>
      {props.value}
    </div>
  );
}

export default BoardCell;
