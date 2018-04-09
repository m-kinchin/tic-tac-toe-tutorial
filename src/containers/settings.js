import React from 'react';
import { connect } from 'react-redux';

import Settings from '../components/settings';
import { changeSize } from '../action/settings';

const mapStateToProps = (state) => {
  return {
    size: state.size
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSizeChange: (size) => {
      dispatch(changeSize(size));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
