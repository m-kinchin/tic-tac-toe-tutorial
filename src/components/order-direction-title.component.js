import React from 'react';
import { connect } from 'react-redux';

import { CHANGE_ORDER } from '../common/consts';

import './order-direction-title.component.css';

function OrderDirectionTitle(props) {
  const title = props.orderDirection ? "Desc" : "Asc";
  return (
    <div className="order-details">
      Now moves are sorted in {title} direction
      <button
        className="order-button"
        onClick={() => props.onReorderClick()}>
        Change order
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    orderDirection: state.movesSortDesc
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onReorderClick: () => {
      dispatch({
        type: CHANGE_ORDER
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDirectionTitle);
