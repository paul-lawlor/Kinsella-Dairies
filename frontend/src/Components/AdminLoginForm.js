import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import css from "../Pages/App.css";

const AdminLoginForm = () => {
  const navigate = useNavigate();
  const ACCOUNT_REST_API_URL = "http://localhost:5000/login";

  const [form, setForm] = useState({
    phoneNumber: "",
    password: "",
  });

  const submitForm = async (e) => {
    e.preventDefault();

    const json = JSON.stringify(form);

    axios
      .post(ACCOUNT_REST_API_URL, json, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data[0] === "t" && response.data[2] === "true") {
          console.log(response);
          localStorage.setItem("userId", response.data[1]);
          console.log(localStorage.getItem("userId"));
          navigate("/admin");
        } else {
          alert("Invalid credentials entered, please try again.");
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("Login failed, please try again.");
      });
  };

  return (
    <>
      <div className="d-flex justify-content-around">
        <div className="form-area d-flex flex-column w-50">
          <h2 className="mx-3 mt-3">Admin Login</h2>
          <form className="p-2" onSubmit={submitForm}>
            <div className="d-flex flex-column m-1">
              <label>Admin Number</label>
              <input
                value={form.phoneNumber}
                onChange={(e) => {
                  setForm({
                    ...form,
                    phoneNumber: e.target.value,
                  });
                }}
              />

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

            <div className="mt-3">
              <button type="submit" className="btn btn-primary m-1">
                Login
              </button>
            </div>
          </form>
          <p className="text-right mx-3">
            Don't have an account yet <Link to="/Signup">sign up?</Link>
          </p>
        </div>

        <div className="admin-info-area w-50 p-2">
          <h3>How to log in</h3>

          <p>
            {" "}
            To log in, please enter your assigned admin number and password.{" "}
          </p>

          <p>
            Use your mouse to navigate over to the box under Admin Number ,
            left-click on it, and then type in your admin number. Once you have
            done this, do the same for the Password box.
          </p>
          <p>
            After you have entered information into both boxes, move your mouse
            over to the
            <b> Login</b> button and click it. Ensure the information you have
            entered is correct
          </p>

          <p>
            If you do not yet have admin credentials, please contact your line
            manager and resolve this.
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminLoginForm;
