import React from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentForm = (props) => {

  let order = props.order;
  order.type = "Card";
  order = JSON.stringify(order);

  const navigate = useNavigate();
  const PAYMENT_REST_API_URL = "http://localhost:5000/payments";
  const ORDER_REST_API_URL =
    "http://localhost:5000/orders/" + localStorage.getItem("userId");

  const [form, setForm] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });



  //POST of payment data
  const submitForm = async (e) => {

    
    e.preventDefault();

    const json = JSON.stringify(form);
    console.log(json);

    await axios
      .post(PAYMENT_REST_API_URL, json, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(function (response) {
        console.log(response.data);
        submitOrder();
      })
      .catch(function (error) {
        console.log(error);
        alert("Invalid data entered, please try again.");
      });
  };

  //POST order
  const submitOrder = async (e) => {
    console.log(props.order);

    //POST of order data
    await axios.post(ORDER_REST_API_URL, order, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(function (response) {
        console.log(response);
        alert("Your order has been placed.");
        localStorage.setItem("userOrder", "true");
        localStorage.removeItem("basket");
        navigate("/orders");
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
      });
  };



  return (
    <div>
      <form onSubmit={submitForm}>
        <div>
          <label>Card Number</label>
          <input
            value={form.cardNumber}
            onChange={(e) => {
              setForm({
                ...form,
                cardNumber: e.target.value,
              });
            }}
          />
        </div>

        <div>
          <label>Expiry Date</label>
          <input
            value={form.expiry}
            onChange={(e) => {
              setForm({
                ...form,
                expiry: e.target.value,
              });
            }}
          />
        </div>

        <div>
          <label>CVV</label>
          <input
            value={form.cvv}
            onChange={(e) => {
              setForm({
                ...form,
                cvv: e.target.value,
              });
            }}
          />
        </div>

        <button type="submit"> Submit Form</button>
      </form>
    </div>
  );
};

export default PaymentForm;
