import React from 'react';

import './board.component.css'

function Square(props) {
  return (
    <button className={props.className} onClick={() => props.onClick(props.id)}>
      {props.value}
    </button>
  );
}

export default class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        id={i}
        value={this.props.squares[i].value}
        className={this.props.squares[i].className}
        onClick={this.props.onClick}
      />
    );
  }

  render() {
    let rows = [];
    for(let i = 0; i < this.props.size; i++) {
      let cells = [];
      for(let j = 0; j < this.props.size; j++) {
        cells.push(this.renderSquare(j + i * this.props.size));
      }
      rows.push(
        <div key={i.toString()} className="board-row">
          {cells}
        </div>);
    }
    return (
      <div className="game-board">
        {rows}
      </div>
    );
  }
}
