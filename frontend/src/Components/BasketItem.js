import React, { useState, useEffect } from "react";
import ShopService from "../Services/ShopService";
import axios from "axios";

const incrementQuantity = (basket, productName) => {
  const existingItemIndex = basket.findIndex(
    (item) => item.productName === productName
  );
  if (basket[existingItemIndex].quantity >= 10 || basket[existingItemIndex].stock < basket[existingItemIndex].quantity + 1) {
    alert("You can't add any more to your order");
    basket[existingItemIndex].quantity--;
  }
  basket[existingItemIndex].quantity++;
  return [...basket];
};

const decrementQuantity = (basket, productName) => {
  const existingItemIndex = basket.findIndex(
    (item) => item.productName === productName
  );
  if (basket[existingItemIndex].quantity === 1)
    basket.splice(existingItemIndex, 1);
  else basket[existingItemIndex].quantity--;
  return [...basket];
};

const BasketItem = ({ product, basket, setBasket }) => {
  const { image, productName, quantity } = product;

  function removeItem(productName) {
    const newBasket = decrementQuantity(basket, productName);
    setBasket(newBasket);
    localStorage.setItem("basket", JSON.stringify(newBasket));
  }

  function addItem(productName) {
    const newBasket = incrementQuantity(basket, productName);
    setBasket(newBasket);
    localStorage.setItem("basket", JSON.stringify(newBasket));
  }

  let price = product?.price * product?.quantity;
  price = price.toFixed(2);

  return (
    <div className="display-flex align-items-center p-1 m-1 bg-light rounded-2">
      <img className="rounded-2 m-1" src={image} width="75" height="75" />
      <p>
        <b>{productName}</b> £{price}
      </p>
      <p> Quantity X {quantity} </p>
      <button
        className="btn btn-danger m-1 w-"
        onClick={() => {
          console.log("remove");
          removeItem(productName);
        }}
      >
        {" "}
        -{" "}
      </button>
      <button
        className="btn btn-secondary m-1"
        onClick={() => {
          console.log("add");
          addItem(productName);
        }}
      >
        {" "}
        +
      </button>
    </div>
  );
};

export default BasketItem;
