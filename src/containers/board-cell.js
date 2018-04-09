import React from 'react';
import { connect } from 'react-redux';

import BoardCell from '../components/board-cell';
import { cellClick } from '../action/board';

import '../styles/board-cell.css';

const mapStateToProps = (state, ownProps) => {
  debugger;
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
      dispatch(cellClick(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardCell);
