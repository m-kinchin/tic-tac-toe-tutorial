import React from 'react';

import BoardCell from './board-cell.component';
import './board.component.css'

function Cell(props) {
  return (
    <div className={props.className} onClick={() => props.onClick(props.id)}>
      {props.value}
    </div>
  );
}

export default class Board extends React.Component {
  renderCell(i) {
    return (
      <BoardCell
        key={i}
        id={i}
        value="x"
        className="square"
      />
    );
  }

  render() {
    let rows = [];
    const size = 3;
    for(let i = 0; i < size; i++) {
      let cells = [];
      for(let j = 0; j < size; j++) {
        cells.push(this.renderCell(j + i * size * 1));
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
