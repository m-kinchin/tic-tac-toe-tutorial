import React from 'react';

function Move(props) {
  return (
    <li key={props.move}>
      <button
        style={props.style}
        onClick={() => props.onClick(props.movePlace)}
      >
        {props.desc}
      </button>
    </li>
  );
}

function Moves(props) {
  return (
    <div>
      <ol>
        {props.moves.map((move, index) => (
          <Move key={index} {...move} onClick={props.onMoveClick}/>
        ))}
      </ol>
    </div>
  );
}

function OrderDirectionTitle(props) {
  return (
    <div>
      {props.orderDirectionTitle}
    </div>
  );
}

export default class MoveBoard extends React.Component {
  jumpTo = (i) => {
    const history = this.state.history.slice(0, i + 1);
    this.setState({
      history: history,
    });
  }

  render() {
    const history = this.props.sortDesc ? this.props.history.reverse() : this.props.history;
    const orderDirectionTitle = "Moves is in " + (this.props.sortDesc ? "decending order." : "ascending order.");
    const moves = history.map((step, move) => {
      let movePlace = this.props.sortDesc ? this.props.history.length - move - 1: move;
      const style = (this.props.history.length - 1 === movePlace) ? {fontWeight: "bold"}: {};
      const desc = movePlace ?
        'Go to move #' + movePlace +  " (coll " + step.lastMoveCoord.coll + " , row " + step.lastMoveCoord.row + ")":
        'Go to game start';
      return {
        move,
        movePlace,
        style,
        desc
      };
    });

    return (
      <div>
        <OrderDirectionTitle orderDirectionTitle={orderDirectionTitle} />
        <Moves moves={moves} onMoveClick={this.props.onClick} />
      </div>
    )
  }
}
