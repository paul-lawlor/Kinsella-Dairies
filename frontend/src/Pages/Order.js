import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import OrderBasketItem from "../Components/OrderBasketItem";
import axios from "axios";
import confused from "../Images/confused.png";
import "./App.css";


const Order = () => {
  const id = localStorage.getItem("userId");
  const ORDER_REST_API_URL = "http://localhost:5000/orders/" + id;
  const { isLoading, error, data } = useQuery(ORDER_REST_API_URL);
  const [orderData, setOrderData] = useState({});

  let total = 0.0;

  const deleteOrder = () => {
    let choice = confirm("Do you really want to cancel your order?");
    if (choice == true) {
      const orderUrl = "http://localhost:5000/orders/" + data.orderID;
      axios.delete(orderUrl).then(function (response) {
        alert("Order has been cancelled successfully");
        localStorage.removeItem("userOrder");
        window.location.reload();
      });
    }
  };

  const getData = () => {
    console.log(data);

    if (isLoading) return "Loading...";

    if (localStorage.getItem("userId") === null) {
      return (
        <div className="p-3 d-flex">
          <img src={confused} width="130" height="130" className="rounded-2" />
          <div className="d-flex flex-column mx-3 align-self-center">
            <h2>You are not logged in</h2>
            <p>
              Please either <a href="/login">Login</a> or{" "}
              <a href="/signup">Sign up</a>.
            </p>
          </div>
        </div>
      );
    }

    if (!data || error) {
      //localStorage.removeItem("userId");

      return (
        <>
          <div className="p-3 d-flex">
            <img
              src={confused}
              width="130"
              height="130"
              className="rounded-2"
            />
            <div className="d-flex flex-column mx-3 align-self-center">
              <h2>
                Whoops! There's a problem with our Shop page at the moment...
              </h2>
              <h3>Try again later.</h3>
              <p>
                Please either <a href="/login">Login</a> or{" "}
                <a href="/signup">Sign up</a>.
              </p>
            </div>
          </div>
        </>
      );
    }

    console.log(data.orderID);
    //delivery fee
    const delivery = 1;
    total += data.totalPrice;
    console.log(data);
    return (
      <>
        <div className="m-4 p-3 d-flex flex-column bg-light rounded-3 shadow">
          <h2>Your Current Order</h2>
          <h5>Order #{data.orderID}</h5>
          {JSON.parse(data?.items).map((item, i) => (
            <OrderBasketItem product={item} index={i} />
          ))}
          <p className="mt-1 pt-2">Delivery Fee: £{delivery.toFixed(2)}</p>
          <b className="mb-1 pb-2">Total: £{total.toFixed(2)}</b>
          <p>Payment method: {data.type}</p>
          <div className="d-flex flex-column m-2">
            <small className="finePrint mb-1">
              You must cancel 3 days before your next order, otherwise you will
              still be charged for it.
            </small>
            <button
              className="w-25 btn btn-danger"
              onClick={() => deleteOrder()}
            >
              Cancel Order
            </button>
          </div>
        </div>
      </>
    );
  };

  return getData();
};

export default Order;
