import React from 'react';
import { connect } from 'react-redux';

import { SQUARE_CLICKED } from '../common/consts';

import './board-cell.component.css';

function BoardCell(props) {
  return (
    <div className={props.className} onClick={() => props.onCellClick(props.id)}>
      {props.value}
    </div>
  );
}

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
      dispatch({
        type: SQUARE_CLICKED,
        id
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardCell);
