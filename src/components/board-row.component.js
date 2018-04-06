import React from 'react';
import { connect } from 'react-redux';

function BoardRow(props) {
  return (
    <div className="board-row">
      {props.cells}
    </div>
  );
}

function cellFilter(sq)

const mapStateToProps = (state, ownProps) => {
  const cell = state.history[state.history.length - 1].squares[ownProps.id];
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
