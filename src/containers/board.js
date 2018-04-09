import React from 'react';
import { connect } from 'react-redux';

import Board from '../components/board';

const mapStateToProps = (state) => {
  return {
    size: state.size
  };
};

export default connect(mapStateToProps, null)(Board);
