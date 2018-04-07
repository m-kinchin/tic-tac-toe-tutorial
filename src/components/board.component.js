import React from 'react';
import { connect } from 'react-redux';

import BoardCell from './board-cell.component';

import './board.component.css'

const mapStateToProps = (state) => {
  return {
    size: state.size
  };
};

function Board(props) {
  const style = {gridTemplate: 'repeat(' + props.size + ', 34px) / repeat(' + props.size + ', 34px)'};
  return (
    <div className="game-board" style={style}>
      {[...Array(Math.pow(props.size, 2))].map((e, i) => (
        <BoardCell key={i} id={i} />
      ))}
    </div>
  );
}

export default connect(mapStateToProps, null)(Board);
