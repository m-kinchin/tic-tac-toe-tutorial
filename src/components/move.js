import React from 'react';

const Move = (props) => {
  return (
    <li key={props.move}>
      <button
        style={props.style}
        onClick={() => props.onMoveClick(props.moveIndex)}
      >
        {props.moveDescription}
      </button>
    </li>
  );
}

export default Move;
