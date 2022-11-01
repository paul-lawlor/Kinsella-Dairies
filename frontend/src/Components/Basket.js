import React from "react";
import ProductList from "./ProductList";
import BasketItem from './BasketItem';
import ShopService from "../Services/ShopService";
import { useState, useEffect } from 'react';

export default function Basket() {

  const [product, setProduct] = useState([]);
  let total = 0.0;

  let basketItems = [];

  if (localStorage.getItem('basket') !== null) {

    let itemCount = (JSON.parse(localStorage.getItem('basket'))).length

    for (let i = 0; i < itemCount; i++) {

      let currentItem = JSON.parse(localStorage.getItem('basket'))[i]
      basketItems.push(<BasketItem product={currentItem} index={i}/>)
      total += currentItem.price

    }
    
  }
  
  const delivery = 1
  total += delivery

  return (
    <aside className="block cart m-5 col-1 d-flex flex-column justify-content-between align-middle">
      <h2>Basket Items</h2>
      {basketItems}
      <p className="mt-1 pt-2">Delivery Fee: £{delivery}</p>
      <b className="mb-1 pb-2">Total: £{total}</b>
      <button className="basket-button btn btn-secondary">Place Order</button>
    </aside>
  );
}
