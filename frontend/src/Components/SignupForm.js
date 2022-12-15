import React from "react";
import { useState } from "react";
import axios from "axios";
import css from "../Pages/App.css";
import { TextCenter } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const SignupForm = () => {
  const navigate = useNavigate();

  const ACCOUNT_REST_API_URL = "http://localhost:5000/accounts";

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    addressLineOne: "",
    addressLineTwo: "",
    postcode: "",
    password: "",
  });

  const submitForm = async (e) => {
    e.preventDefault();

    // Encrypt password
    let encPassword = CryptoJS.AES.encrypt(
      form.password,
      "farmercraig123"
    ).toString();

    const json = JSON.stringify({
      firstName: form.firstName,
      lastName: form.lastName,
      phoneNumber: form.phoneNumber,
      addressLineOne: form.addressLineOne,
      addressLineTwo: form.addressLineTwo,
      postcode: form.postcode,
      password: encPassword,
    });

    axios
      .post(ACCOUNT_REST_API_URL, json, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        alert("You have signed up successfully.");
        localStorage.setItem("userId", response.data.userID);
        navigate("/accounts");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="d-flex justify-content-around">
      <div className="formArea w-50">
        <h2 className="mx-3 mt-3">Signup</h2>
        <form onSubmit={submitForm}>
          <div className="name-entry p-3 d-flex flex-column">
            <div className="d-flex my-1">
              <div className="firstName d-flex flex-column m-1 w-100">
                <label>First name</label>
                <input
                  className="w-100"
                  value={form.firstName}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      firstName: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="lastName d-flex flex-column m-1 w-100">
                <label>Last name</label>
                <input
                  className="w-100"
                  value={form.lastName}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      lastName: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="phoneNumber d-flex flex-column m-1 w-100">
              <label>Phone Number</label>
              <input
                value={form.phoneNumber}
                onChange={(e) => {
                  setForm({
                    ...form,
                    phoneNumber: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          <div className="address-entry p-3">
            <div className="addresses d-flex flex-column m-1">
              <label>Address Line 1</label>
              <input
                className="w-100"
                value={form.addressLineOne}
                onChange={(e) => {
                  setForm({
                    ...form,
                    addressLineOne: e.target.value,
                  });
                }}
              />

              <label>Address Line 2</label>
              <input
                className="w-100"
                value={form.addressLineTwo}
                onChange={(e) => {
                  setForm({
                    ...form,
                    addressLineTwo: e.target.value,
                  });
                }}
              />
            </div>

            <div className="d-flex flex-column m-1">
              <label>Postcode</label>
              <input
                className="w-50"
                value={form.postcode}
                onChange={(e) => {
                  setForm({
                    ...form,
                    postcode: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          <div className="password d-flex flex-column p-3 m-1">
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => {
                setForm({
                  ...form,
                  password: e.target.value,
                });
              }}
            />
          </div>
          <div className="p-3 py-1">
            <button type="submit" className="btn btn-primary m-1">
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-right mx-3">
          Already registered <Link to="/Login">log in?</Link>
        </p>
      </div>

      <div className="info-area w-50 p-2">
        <h2>Please fill in all of the information in the signup form.</h2>
        <p>
          Make sure to keep note of your <b>phone number</b> and <b>password</b>{" "}
          as you will need both when you login.
        </p>

        <p>
          When you have entered all of your details, click the <b>"Sign Up"</b>{" "}
          button below the form.
        </p>

        <p>
          If you already have an account with Kinsella Dairies, please proceed
          to the <b>Login</b> page.
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
