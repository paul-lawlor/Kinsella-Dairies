import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import BasketItem from "./BasketItem";
import ShopService from "../Services/ShopService";

const DELIVERY_FEE = 1;

export default function Basket() {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("basket") !== null) {
      setBasket(JSON.parse(localStorage.getItem("basket")));
    }
  }, []);

  const manageStock = async () => {
    //remove 'quantity' of basket items from the 'stock' level (for each item in the basket)
    for (let i = 0; i < basket.length; i++) {
      let STOCK_REST_API_URL =
        "http://localhost:5000/admin/stock/" + basket[i].productID;
      let stockAfter = basket[i].stock - basket[i].quantity;

      let json = JSON.stringify({
        stock: stockAfter,
      });

      await axios
        .put(STOCK_REST_API_URL, json, {
          headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          alert("An error occurred with your order.");
          console.log(error);
        });
    }
    console.log(stockAfter);
  };

  const placeOrder = async () => {
    //const json = localStorage.getItem('basket')

    // If not signed in, prompt user
    if (localStorage.getItem("userId") === null) {
      alert("Please sign-up or login to place an order.");
      return;
    }

    let id = localStorage.getItem("userId");
    let items = localStorage.getItem("basket");

    const apiUrl = "http://localhost:5000/orders/" + id;

    let order = {
      totalPrice: total,
      userID: id,
      items: items,
    };

    if (localStorage.getItem("userOrder") === "true") {
      alert(
        "You have already placed an order. Please cancel it before making a new one."
      );
      return;
    }

    //post request which transfers the data
    await axios
      .post(apiUrl, order)
      .then(function (response) {
        console.log(response);
        alert("Your order has been placed.");
        manageStock(basket);
        localStorage.setItem("userOrder", "true");
        localStorage.removeItem("basket");
        navigate("/orders");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //delivery fee
  const total = basket.reduce(
    (acc, item) => acc + item.price * item.quantity,
    DELIVERY_FEE
  );

  if (basket.length) {
    return (
      <aside className="block cart m-5 col-1 d-flex flex-column justify-content-between align-middle shadow-sm">
        <h2>Basket</h2>
        {basket.map((item) => (
          <BasketItem product={item} basket={basket} setBasket={setBasket} />
        ))}
        <p className="mt-1 pt-2">Delivery Fee: £{DELIVERY_FEE.toFixed(2)}</p>
        <b className="mb-1 pb-2">Total: £{total.toFixed(2)}</b>
        <button
          className="basket-button btn btn-secondary"
          onClick={() => placeOrder()}
        >
          Place Order
        </button>
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
