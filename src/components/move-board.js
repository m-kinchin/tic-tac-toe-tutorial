import React from 'react';

import Moves from '../containers/moves';
import OrderDirectionTitle from '../containers/order-direction-title';

const MoveBoard = () => {
  return (
    <div>
      <OrderDirectionTitle />
      <Moves />
    </div>
  )
};

export default MoveBoard;
