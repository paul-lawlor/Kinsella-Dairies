import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import BasketItem from "./BasketItem";
import ShopService from "../Services/ShopService";
import PaymentForm from "./PaymentForm";

const DELIVERY_FEE = 1;

export default function Basket() {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [basket, setBasket] = useState([]);
  const [paying, setPaying] = useState(false);
  const [order, setOrder] = useState({});

  useEffect(() => {
    if (localStorage.getItem("basket") !== null) {
      setBasket(JSON.parse(localStorage.getItem("basket")));
    }
  }, []);

  const placeOrder = async () => {
    //const json = localStorage.getItem('basket')
    let id = localStorage.getItem("userId");
    let items = localStorage.getItem("basket");

    console.log(total);

    setOrder({
      totalPrice: total,
      userID: id,
      items: items,
    });

    if (localStorage.getItem("userOrder") === "true") {
      alert(
        "You have already placed an order. Please cancel it before making a new one."
      );
      return;
    }

    //post request which transfers the data
    // await axios
    //   .post(apiUrl, order)
    //   .then(function (response) {
    //     console.log(response);
    //     alert("Your order has been placed.");
    //     localStorage.setItem("userOrder", "true");
    //     localStorage.removeItem("basket");
    //     navigate("/orders");
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    //navigate("/payment");
    setPaying(true);
  };

  //delivery fee
  const total = basket.reduce(
    (acc, item) => acc + item.price * item.quantity,
    DELIVERY_FEE
  );

  if (basket.length && paying == false) {
    return (
      <aside className="block cart m-5 col-1 d-flex flex-column justify-content-start align-middle shadow-sm">
        <h2>Basket</h2>
        {basket.map((item) => (
          <BasketItem product={item} basket={basket} setBasket={setBasket} />
        ))}
        <p className="mt-1 pt-2">Delivery Fee: £{DELIVERY_FEE.toFixed(2)}</p>
        <b className="mb-1 pb-2">Total: £{total.toFixed(2)}</b>
        <button
          className="basket-button btn btn-secondary"
          onClick={() => {
            placeOrder();
          }}
        >
          Place Order
        </button>
      </aside>
    );
    // When an order is being paid
  } else if (basket.length && paying === true) {
    return (
      <aside className="block cart m-5 col-1 d-flex flex-column justify-content-start align-middle shadow-sm">
        <h2>Payment</h2>
        <p className="mt-1 pt-2">Delivery Fee: £{DELIVERY_FEE.toFixed(2)}</p>
        <b className="mb-1 pb-2">Total: £{total.toFixed(2)}</b>
        <button
          onClick={() => {
            setPaying(false);
          }}
        >
          Cancel
        </button>
        <PaymentForm order={order} />
      </aside>
    );
  } else {
    return (
      <aside className="block cart m-5 col-1 d-flex flex-column justify-content-start align-middle shadow-sm">
        <h2>Basket</h2>
        <p className="mt-1 pt-2">Your basket is empty</p>
      </aside>
    );
  }
}
