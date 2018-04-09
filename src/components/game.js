import React from 'react';

import Board from '../containers/board';
import GameStatus from '../containers/game-status';
import MoveBoard from './move-board';
import Settings from '../containers/settings';

import '../styles/game.css';

const Game = () => {
  return (
    <div className="game">
      <Board />
      <div className="game-info">
        <GameStatus/>
        <Settings />
        <MoveBoard />
      </div>
    </div>
  );
};

export default Game;
