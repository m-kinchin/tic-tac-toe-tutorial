import React from 'react';
import { connect } from 'react-redux';

import OrderDirectionTitle from '../components/order-direction-title';
import { reorderMoves } from '../action/moves';

import '../styles/order-direction-title.css';

const mapStateToProps = (state) => {
  return {
    orderDirection: state.movesSortDesc
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onReorderClick: () => {
      dispatch(reorderMoves());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDirectionTitle);
