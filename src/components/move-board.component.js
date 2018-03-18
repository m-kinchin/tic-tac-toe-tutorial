import React from 'react';

export default class MoveBoard extends React.Component {
  render() {
    const history = this.props.sortDesc ? this.props.history.slice().reverse() : this.props.history;
    const sortOrderTitle = "Moves is in " + (this.props.sortDesc ? "decending order." : "ascending order.");
    const moves = history.map((step, move) => {
      let realMove = this.props.sortDesc ? this.props.history.length - move - 1: move;
      const style = (this.props.history.length - 1 === realMove) ? {fontWeight: "bold"}: {};
      const desc = realMove ?
        'Go to move #' + realMove +  " (coll " + step.lastMoveCoord.coll + " , row " + step.lastMoveCoord.row + ")":
        'Go to game start';
      return (
        <li key={move}>
          <button style={style} onClick={() => this.props.onClick(realMove)}>{desc}</button>
        </li>
      );
    });

    return (
      <div>
        <div>{sortOrderTitle}</div>
        <div><ol>{moves}</ol></div>
      </div>
    )
  }
}
