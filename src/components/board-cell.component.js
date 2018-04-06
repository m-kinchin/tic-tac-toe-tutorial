import React from 'react';
import { connect } from 'react-redux';

import './board-cell.component.css';

function BoardCell(props) {
  return (
    <button className={props.className} onClick={() => props.onCellClick(props.id)}>
      {props.value}
    </button>
  );
}

const clickCell = (id) => {
  return {
    type: 'SQUARE_CLICKED',
    id
  };
};

const mapStateToProps = (state, ownProps) => {
  const cell = state.history[state.history.length - 1].squares[ownProps.id];
  // debugger;
  return {
    className: cell.className,
    value: cell.value,
    id: ownProps.id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCellClick: (id) => {
      dispatch(clickCell(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardCell);