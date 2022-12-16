import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import BasketItem from "./BasketItem";
import ShopService from "../Services/ShopService";
import PaymentForm from "./PaymentForm";
import { BackspaceReverse } from "react-bootstrap-icons";

const DELIVERY_FEE = 1;

export default function Basket(props) {
  const orderData = JSON.stringify(props.order);

  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [basket, setBasket] = useState([]);
  const [paying, setPaying] = useState(false);
  const [order, setOrder] = useState({});
  const [cardPayment, setCardPayment] = useState(false);

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

  const ORDER_REST_API_URL =
    "http://localhost:5000/orders/" + localStorage.getItem("userId");

  const placeOrder = () => {
    if (localStorage.getItem("userId") === null) {
      alert("Please sign-up or login to place an order.");
      return;
    }

    //const json = localStorage.getItem('basket')
    const id = localStorage.getItem("userId");
    const items = localStorage.getItem("basket");

    console.log(total);

    setOrder({
      totalPrice: total,
      userID: id,
      items: items,
      type: "Cash",
    });

    if (localStorage.getItem("userOrder") === "true") {
      return alert(
        "You have already placed an order. Please cancel it before making a new one."
      );
    }

    setPaying(true);
  };

  const submitOrder = async (e) => {
    //POST of order data
    await axios
      .post(ORDER_REST_API_URL, order, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
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
        alert(error);
      });
  };

  function handlePayment() {
    //indicates that user is paying by card
    setCardPayment(true);
  }

  //delivery fee
  console.log(basket);
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
          className="basket-button btn btn-primary"
          onClick={() => {
            placeOrder();
          }}
        >
          Place Order
        </button>
      </aside>
    );
    // When an order is being paid
  } else if (basket.length && cardPayment === true && paying === true) {
    return (
      <aside className="block cart m-5 col-1 d-flex flex-column justify-content-start align-middle shadow-sm">
        <h2>Payment</h2>

        <b className="mb-1 pb-2">Total: £{total.toFixed(2)}</b>
        <button
          onClick={() => {
            setPaying(false);
            setCardPayment(false);
          }}
        >
          Cancel
        </button>
        <PaymentForm order={order} />
      </aside>
    );
  } else if (basket.length && paying === true) {
    return (
      <aside className="block cart m-5 col-1 d-flex flex-column justify-content-start align-middle shadow-sm">
        <h2> Please select a payment option </h2>
        <b className="mb-1 pb-2">Total: £{total.toFixed(2)}</b>
        <div>
          <button onClick={submitOrder} className="paymentoption">
            CASH
          </button>{" "}
          <button onClick={handlePayment} className="paymentoption">
            CARD
          </button>
        </div>
        <button
          onClick={() => {
            setPaying(false);
            setCardPayment(false);
          }}
          className="btn btn-danger danger"
        >
          Cancel
        </button>
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
