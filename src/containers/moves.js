import React from 'react';
import { connect } from 'react-redux';

import Move from '../components/move';
import { backInHistory } from '../action/moves';

const Moves = (props) => {
  let history = props.history;
  const len = history.length;
  if(props.movesSortDesc) {
    history = history.slice().reverse();
  }
  
  const moves = history.map((step, move) => {
    let moveIndex = props.movesSortDesc ? len - move - 1: move;
    const style = (len - 1 === moveIndex) ? {fontWeight: "bold"}: {};
    const moveDescription = moveIndex ?
      'Go to move #' + moveIndex +  " (coll " + step.lastMoveCoord.coll + " , row " + step.lastMoveCoord.row + ")":
      'Go to game start';
    return {
      move,
      moveIndex,
      style,
      moveDescription
    };
  });

  return (
    <ol>
      {moves.map((move, index) => (
        <Move key={index} {...move} onMoveClick={props.onMoveClick}/>
      ))}
    </ol>
  );
}

const mapStateToProps = (state) => {
  return {
    history: state.history,
    movesSortDesc: state.movesSortDesc
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMoveClick: (moveIndex) => {
      dispatch(backInHistory(moveIndex));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Moves);
