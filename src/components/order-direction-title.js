import React from 'react';

import '../styles/order-direction-title.css';

const OrderDirectionTitle = (props) => {
  const title = props.orderDirection ? "Desc" : "Asc";
  return (
    <div className="order-details">
      Now moves are sorted in {title} direction
      <button
        className="order-button"
        onClick={props.onReorderClick}>
        Change order
      </button>
    </div>
  );
}

export default OrderDirectionTitle;
