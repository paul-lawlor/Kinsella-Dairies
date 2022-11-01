import React from "react";
import ProductList from "./ProductList";

export default function Basket(props) {


//display cart data

//add or remove items

//submit order

  return (
    <aside className="block cart m-5 col-1 d-flex flex-column justify-content-between align-middle">
      <h2>Basket Items</h2>
{/* 
      <div className = "products">
            {basket.products?.map((products) => (
              <div className="singleproduct"key={products.productID}>
                <h5> {products.productName}</h5>
                <img className="pimage" src ={products.image}></img>
                <h6> £{products.price}</h6>
              </div>
            ))}
      </div> */}

      <button className="basket-button btn btn-secondary">Place Order</button>
    </aside>
  );
}
