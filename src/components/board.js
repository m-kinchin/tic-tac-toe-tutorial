import React from 'react';

import BoardCell from '../containers/board-cell';

import '../styles/board.css'

const Board = (props) => {
  const style = {gridTemplate: 'repeat(' + props.size + ', 34px) / repeat(' + props.size + ', 34px)'};
  return (
    <div className="game-board" style={style}>
      {[...Array(Math.pow(props.size, 2))].map((e, i) => (
        <BoardCell key={i} id={i} />
      ))}
    </div>
  );
};

export default Board;
