import React from 'react';
import ReactDOM from 'react-dom';

import Board from './components/board.component'
import MoveBoard from './components/move-board.component'
import { calculateWinner } from './utilities'

import './index.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(this.props.size*this.props.size).fill(null),
        xIsNext: true,
        win: false,
        winner: undefined
      }],
      size: this.props.size,
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
      xIsNext: !current.xIsNext
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

  getStatus(current) {
    if (current.win) {
      return 'Winner: ' + current.winner;
    } else {
      return 'Next player: ' + (current.xIsNext ? 'X' : 'O');
    }
  }

  render() {
    const history = this.state.history.slice();
    let current = history[history.length - 1];
    let squares = current.squares.slice();
    let status = this.getStatus(current);

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
          <MoveBoard
            history={this.state.history}
            onClick={(i) => this.jumpTo(i)}/>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game size={5}/>,
  document.getElementById('root')
);
