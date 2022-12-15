import React from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";

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

    //ENCRYPT SENSITIVE DATA BEFORE IT IS SENT TO THE DATABASE

    // let encryptedForm = CryptoJS.AES.encrypt(json, "farmercraig123").toString();
    // console.log(encryptedForm);

    // Encrypt card data
    const encCardNumber = CryptoJS.AES.encrypt(form.cardNumber, "farmercraig123").toString();
    const encExpiry = CryptoJS.AES.encrypt(form.expiry, "farmercraig123").toString();
    const encCvv = CryptoJS.AES.encrypt(form.cvv, "farmercraig123").toString();

    // Stringify encrypted data to be sent
    const json = JSON.stringify({
      cardNumber: encCardNumber,
      expiry: encExpiry,
      cvv: encCvv
    });

    /* Decryption code
    let bytes = CryptoJS.AES.decrypt(encryptedForm, "farmercraig123");
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log(decryptedData);
    */

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
      <form className="" onSubmit={submitForm}>
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

        <button className="btn btn-success" type="submit"> Submit Form</button>
      </form>
    </div>
  );
};

export default PaymentForm;
