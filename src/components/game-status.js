import React from 'react';

import '../styles/game-status.css';

const GameStatus = (props) => {
  return (
    <div className="win-status">{props.status}</div>
  );
};

export default GameStatus;
