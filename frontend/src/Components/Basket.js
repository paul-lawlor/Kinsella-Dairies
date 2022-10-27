import React from "react";

export default function Basket(props) {
  return (
    <aside className="block cart m-5 col-1 d-flex flex-column justify-content-between align-middle">
      <h2>Basket Items</h2>
      <button className="basket-button btn btn-secondary">Place Order</button>
    </aside>
  );
}
