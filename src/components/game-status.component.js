import React from 'react';
import { connect } from 'react-redux';

const getStatus = (winner, totalCount, moveCount, xIsNext) => {
  if (winner) {
    return 'Winner: ' + winner;
  } else if(totalCount <= moveCount) {
    return 'The END. No winner.';
  } else {
    return 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
}

function GameStatus(props) {
  return (
    <div>{props.status}</div>
  );
}

const mapStateToProps = (state) => {  
  const currentState = state.history[state.history.length - 1];
  return {
   status: getStatus(currentState.winner, currentState.squares.length, currentState.moveCount, currentState.xIsNext)
  };
};

export default connect(mapStateToProps, null)(GameStatus);
