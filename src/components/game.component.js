import React from 'react';

import Board from './board.component';
import GameStatus from './game-status.component';
import MoveBoard from './move-board.component';
import Settings from './settings.component';

import './game.component.css';

export default function Game() {
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
}
