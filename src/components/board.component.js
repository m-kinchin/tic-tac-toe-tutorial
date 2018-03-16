import React from 'react';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default class Board extends React.Component {
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
