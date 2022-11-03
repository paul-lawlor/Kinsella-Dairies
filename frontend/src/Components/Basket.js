import React from "react";
import ProductList from "./ProductList";
import BasketItem from './BasketItem';
import ShopService from "../Services/ShopService";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Basket() {

  const [product, setProduct] = useState([]);
  let total = 0.0;

  let basketItems = [];

  if (localStorage.getItem('basket') !== null) {

    let itemCount = (JSON.parse(localStorage.getItem('basket'))).length

    for (let i = 0; i < itemCount; i++) {

      let currentItem = JSON.parse(localStorage.getItem('basket'))[i]
      basketItems.push(<BasketItem product={currentItem} index={i}/>)
      total += (currentItem.price)*currentItem.quantity

    }

  }
   
  const placeOrder = async() => {

    //const json = localStorage.getItem('basket')
    let id = localStorage.getItem('userId')
    let items = localStorage.getItem('basket');

    const apiUrl = "http://localhost:5000/orders/"+id

    let order = {
      totalPrice: total,
      userID: id,
      items: items
    }

    axios.post(apiUrl, order)
    .then(function (response){
      alert("Your order has been placed.")
      window.location.href = "http://localhost:3000/orders";
    })
    .catch(function (error) {
      console.log(error);
    });

    localStorage.removeItem('basket');
  }
  
  //delivery fee
  const delivery = 1
  total += delivery

  total = total.toFixed(2)

  if (localStorage.getItem("basket") !== null && localStorage.getItem("basket") !== '[]') {
    return (
      <aside className="block cart m-5 col-1 d-flex flex-column justify-content-between align-middle shadow-sm">
        <h2>Basket</h2>
        {basketItems}
        <p className="mt-1 pt-2">Delivery Fee: £{delivery}</p>
        <b className="mb-1 pb-2">Total: £{total}</b>
        <button className="basket-button btn btn-secondary" onClick={() => placeOrder()}>Place Order</button>
      </aside>
    );
  } else {
    return (
      <aside className="block cart m-5 col-1 d-flex flex-column justify-content-between align-middle shadow-sm">
        <h2>Basket</h2>
        <p className="mt-1 pt-2">Your basket is empty</p>
      </aside>
    );
  }

}
