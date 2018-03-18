import React from 'react';

import Board from './board.component'
import MoveBoard from './move-board.component'
import Settings from './settings.component'
import { calculateWinner } from '../utilities'

import './game.component.css';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    const defaultSize = 3;
    this.state = {
      history: [{
        squares: Array(Math.pow(defaultSize, 2)).fill(null),
        xIsNext: true,
        win: false,
        winner: undefined,
        moveCount: 0,
      }],
      size: defaultSize,
      sizeFieldValue: defaultSize,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice();
    let current = history[history.length - 1];
    let squares = current.squares.slice();

    if(current.win) {
      return;
    }

    if(squares[i]) {
      return;
    }

    squares[i] = current.xIsNext ? 'X' : 'O';
    
    const winner = calculateWinner(squares, this.state.size);
    const newHistoryItem = {
      squares: squares,
      xIsNext: !current.xIsNext,
      moveCount: current.moveCount + 1
    }

    if (winner) {
      newHistoryItem.win = true;
      newHistoryItem.winner = squares[i];
    }

    history.push(newHistoryItem);

    let state = {
      history: history
    };
    
    this.setState(state);
  }

  jumpTo(i) {
    const history = this.state.history.slice(0, i + 1);
    this.setState({
      history: history,
    });
  }

  getStatus(current, size) {
    if (current.win) {
      return 'Winner: ' + current.winner;
    } else if(Math.pow(size, 2) <= current.moveCount) {
      return 'The END. No winner.';
    } else {
      return 'Next player: ' + (current.xIsNext ? 'X' : 'O');
    }
  }

  handleChangeSizeClick() {
    this.setState({
      size: this.state.sizeFieldValue,
      history: [{
        squares: Array(this.state.sizeFieldValue*this.state.sizeFieldValue).fill(null),
        xIsNext: true,
        win: false,
        winner: undefined
      }]
    });
    
  }

  handleSizeValueChange(e) {
    this.setState({
      sizeFieldValue: e.target.value
    });
  }

  render() {
    const history = this.state.history.slice();
    let current = history[history.length - 1];
    let squares = current.squares.slice();
    let status = this.getStatus(current, this.state.size);

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares}
            size={this.state.size}
            xIsNext={current.xIsNext}
            onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <Settings
            onSizeValueChange={(e) => this.handleSizeValueChange(e)}
            onSizeButtonClick={() => this.handleChangeSizeClick()}
            sizeFieldValue={this.state.sizeFieldValue}
            size={this.state.size}/>
          <MoveBoard
            history={this.state.history}
            onClick={(i) => this.jumpTo(i)}/>
        </div>
      </div>
    );
  }
}