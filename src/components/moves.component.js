import React from 'react';
import { connect } from 'react-redux';

import { BACK_IN_HISTORY } from '../common/consts';

let Move = (props) => {
  return (
    <li key={props.move}>
      <button
        style={props.style}
        onClick={() => props.onMoveClick(props.movePlace)}
      >
        {props.moveDescription}
      </button>
    </li>
  );
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMoveClick: () => {
      dispatch({
        type: BACK_IN_HISTORY,
        movePlace: ownProps.movePlace
      })
    }
  }
}

Move = connect(null, mapDispatchToProps)(Move);

function Moves(props) {
  const moves = props.history.map((step, move) => {
    let movePlace = props.movesSortDesc ? props.history.length - move - 1: move;
    const style = (props.history.length - 1 === movePlace) ? {fontWeight: "bold"}: {};
    const moveDescription = movePlace ?
      'Go to move #' + movePlace +  " (coll " + step.lastMoveCoord.coll + " , row " + step.lastMoveCoord.row + ")":
      'Go to game start';
    return {
      move,
      movePlace,
      style,
      moveDescription
    };
  });
  return (
    <ol>
      {moves.map((move, index) => (
        <Move key={index} {...move} onClick={props.onMoveClick}/>
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

export default connect(mapStateToProps, null)(Moves);
