import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square
      key={i}
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}/>;
  }

  render() {
    let rows = [];
    for(let i = 0; i < this.props.size; i++) {
      let cells = [];
      for(let j = 0; j < this.props.size; j++) {
        cells.push(this.renderSquare(j + i * this.props.size));
      }
      rows.push(<div key={i.toString()} className="board-row">
      {cells}
    </div>);
    }
    return (
      <div>
        {rows}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(this.props.size*this.props.size).fill(null),
      }],
      xIsNext: true,
      size: this.props.size,
      win: false,
      winner: undefined
    };
  }

  handleClick(i) {
    if(this.state.win) {
      return;
    }
    const history = this.state.history.slice();
    let squares = history[history.length - 1].squares.slice();
    if(squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    history.push({squares: squares});
    const winner = calculateWinner(squares, this.state.size);
    let state = {
      history: history,
      xIsNext: !this.state.xIsNext
    };
    if (winner) {
      state.win = true;
      state.winner = squares[i];
    }
    this.setState(state);
  }

  render() {
    const history = this.state.history.slice();
    let squares = history[history.length - 1].squares.slice();
    let status;
    if (this.state.win) {
      status = 'Winner: ' + this.state.winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares}
            size={this.state.size}
            xIsNext={this.state.xIsNext}
            onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
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

function calculateWinner(squares, size) {
  let win = true;
  if(squares[0] !== null) {
    for (var i = 1; i < size; i++) {
      if(squares[0] !== squares[(size + 1)* i] || squares[(size + 1)* i] === null) {
        win = false;
        break;
      }
    }
    if(win) {
      return squares[0] + " main diag";
    }
  }

  if(squares[size - 1] !== null) {
    win = true;
    for (var i = 1; i < size; i++) {
      if(squares[size - 1] !== squares[(size - 1) * (i + 1)] || squares[(size - 1) * (i + 1)] === null) {
        win = false;
        break;
      }
    }
    if(win) {
      return squares[size - 1] + " second diag";
    }
  }

  for (var i = 0; i < size; i++) {
    win = true;
    for (var j = 1; j < size; j++) {
      if(squares[i * size] !== squares[i * size + j] || (squares[i * size] === null || squares[i * size + j] === null)) {
        win = false;
        break;
      }
    }
    if(win) {
      return squares[i] + " horiz";
    }
    win = true;
    for (var j = 1; j < size; j++) {
      if(squares[i] !== squares[i + j * size] || (squares[i] === null || squares[i + j * size] === null)) {
        win = false;
        break;
      }
    }
    if(win) {
      return squares[i] + " vert";
    }
  }

  return null;
}