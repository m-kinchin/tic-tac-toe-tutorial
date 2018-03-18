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
        squares: Array(Math.pow(defaultSize, 2)).fill({value: null, className: "square"}),
        xIsNext: true,
        win: false,
        winner: undefined,
        lastMoveCoord: {
          coll: null,
          row: null},
        moveCount: 0,
      }],
      size: defaultSize,
      sizeFieldValue: defaultSize,
      movesSortDesc: false
    };
  }

  handleClick(i) {
    const history = this.state.history.slice();
    let current = history[history.length - 1];
    let squares = current.squares.slice();

    if(current.win) {
      return;
    }

    if(squares[i].value) {
      return;
    }

    squares[i] = {value: current.xIsNext ? 'X' : 'O', className: "square"};
    
    const line = this.checkWinLine(squares);
    const coll = (i + 1) % this.state.size;
    const row = Math.ceil((i + 1) / this.state.size);
    const newHistoryItem = {
      squares: squares,
      xIsNext: !current.xIsNext,
      moveCount: current.moveCount + 1,
      lastMoveCoord: {
        coll: coll ? coll : this.state.size,
        row: row},
    }

    if (line) {
      newHistoryItem.win = true;
      newHistoryItem.winner = squares[i].value;
      for(var w = 0; w < line.length; w++) {
        squares[line[w]] = {value: squares[line[w]].value, className: "square-win"};
      }
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
        squares: Array(this.state.sizeFieldValue*this.state.sizeFieldValue).fill({value: null, className: "square"}),
        xIsNext: true,
        win: false,
        winner: undefined
      }]
    });
    
  }

  handleSizeValueChange(e) {
    this.setState({
      sizeFieldValue: Number(e.target.value)
    });
  }

  handleOrderDirectionChange() {
    this.setState({
      movesSortDesc: !this.state.movesSortDesc,
    });
  }

  checkWinLine(squares) {
    let win = true;
    let winRoute = Array(this.state.size).fill(0);
    let firstItemId = 0;
    if(squares[firstItemId].value !== null) {
      winRoute[0] = firstItemId;
      for (var i = 1; i < this.state.size; i++) {
        const nextId = (this.state.size + 1) * i;
        if(squares[firstItemId].value !== squares[nextId].value || squares[nextId].value === null) {
          win = false;
          break;
        }
        winRoute[i] = nextId;
      }
      if(win) {
        return winRoute;
      }
    }
  
    if(squares[this.state.size - 1].value !== null) {
      win = true;
      firstItemId = this.state.size - 1;
      winRoute = Array(this.state.size).fill(0);
      winRoute[0] = firstItemId;
      for (var i = 1; i < this.state.size; i++) {
        const nextId = (this.state.size - 1) * (i + 1);
        if(squares[firstItemId].value !== squares[nextId].value || squares[nextId].value === null) {
          win = false;
          break;
        }
        winRoute[i] = nextId;
      }
      if(win) {
        return winRoute;
      }
    }
  
    for (var i = 0; i < this.state.size; i++) {
      win = true;
      firstItemId = i * this.state.size;
      winRoute = Array(this.state.size).fill(0);
      winRoute[0] = firstItemId;
      for (var j = 1; j < this.state.size; j++) {
        const nextId = i * this.state.size + j;
        if(squares[firstItemId].value !== squares[nextId].value || (squares[firstItemId].value === null || squares[nextId].value === null)) {
          win = false;
          break;
        }
        winRoute[j] = nextId;
      }
      if(win) {
        return winRoute;
      }
      win = true;
      firstItemId = i;
      winRoute[0] = firstItemId;
      for (var j = 1; j < this.state.size; j++) {
        const nextId = i + j * this.state.size;
        if(squares[firstItemId].value !== squares[nextId].value || (squares[firstItemId].value === null || squares[nextId].value === null)) {
          win = false;
          break;
        }
        winRoute[j] = nextId;
      }
      if(win) {
        return winRoute;
      }
    }
  
    return null;
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
            onOrderDirectionChange={() => this.handleOrderDirectionChange()}
            sizeFieldValue={this.state.sizeFieldValue}
            size={this.state.size}/>
          <MoveBoard
            history={this.state.history}
            onClick={(i) => this.jumpTo(i)}
            sortDesc={this.state.movesSortDesc}/>
        </div>
      </div>
    );
  }
}