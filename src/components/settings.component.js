import React from 'react';
import { connect } from 'react-redux';

import { CHANGE_SIZE } from '../common/consts';

import './settings.component.css';

function Settings(props) {
  let input;
  let size = props.size;
  return (
    <div className="game-settings">
      <input 
        type="number"
        min="2"
        max="10"
        step="1"
        ref={node => {input = node;}}
        defaultValue={props.size}
      />
      <button
        onClick={() => props.onSizeChange(Number(input.value))}
      >
        Set game size
      </button>
    </div>
  ); 
}

const mapStateToProps = (state) => {
  return {
    size: state.size
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSizeChange: (size) => {
      dispatch({
        type: CHANGE_SIZE,
        size
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
