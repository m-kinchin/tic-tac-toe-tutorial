import React from 'react';

import Moves from './moves.component';
import OrderDirectionTitle from './order-direction-title.component';

export default function MoveBoard() {
  return (
    <div>
      <OrderDirectionTitle />
      <Moves />
    </div>
  )
}
