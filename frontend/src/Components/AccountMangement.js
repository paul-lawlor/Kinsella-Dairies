import React from "react";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import AccountService from "../Services/AccountService";
import ErrorMessage from "../Components/ErrorMessage";

const AccountMangement = () => {
  // Defining API URL for later use when targeting the 'accounts' endpoint
  const ACCOUNT_REST_API_URL =
    "http://localhost:5000/accounts/" + localStorage.getItem("userId");

  const nagivate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    addressLineOne: "",
    addressLineTwo: "",
    postcode: "",
    password: "",
  });

  const getData = () => {
    const { isLoading, error, data } = useQuery(ACCOUNT_REST_API_URL); //setting query key to accounts endpoint

    if (isLoading) return "Loading...";

    if (error) {
      //error handling
      localStorage.removeItem("userId");
      return (
        <ErrorMessage
          title="You're not logged in"
          subtitle={
            <p>
              Please either <a href="/login">Login</a> or
              <a href="/signup">Sign up</a>.
            </p>
          }
        />
      );
    }

    if (!data?.[0] || localStorage.length === 0) {
      //user is not logged in
      localStorage.removeItem("userId");

      return (
        <ErrorMessage
          title="You're not logged in"
          subtitle={
            <p>
              Please either <a href="/login">Login</a> or
              <a href="/signup">Sign up</a>.
            </p>
          }
        />
      );
    }

    return (
      //if user is logged in, with no errors
      <div className="d-flex flex-column justify-content-between">
        <div>
          <h1 className="mx-3 mt-3">Accounts Management</h1>

          <form onSubmit={confirmDetails}>
            <div className="name-entry p-3 d-flex flex-column">
              <div className="d-flex my-1">
                <div className="firstName d-flex flex-column m-1 w-100">
                  <label>First name</label>
                  <input
                    className="w-100"
                    defaultValue={data[0].firstName}
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
                    defaultValue={data[0].lastName}
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
                  defaultValue={data[0].phoneNumber}
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
                  defaultValue={data[0].addressLineOne}
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
                  defaultValue={data[0].addressLineTwo}
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
                  defaultValue={data[0].postcode}
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
                defaultValue={data[0].password}
                type="password"
                onChange={(e) => {
                  setForm({
                    ...form,
                    password: e.target.value,
                  });
                }}
              />
            </div>

            <div className="d-flex align-items-between">
              <div className="p-3 py-1">
                <button type="submit" className="btn btn-primary m-1">
                  Update Account Info
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="p-3 py-1">
          <button className="btn btn-secondary m-1" onClick={logOut}>
            Logout
          </button>
          <button onClick={deleteAccount} className="btn btn-danger m-1">
            Delete Account
          </button>
        </div>
      </div>
    );
  };

  //when update button is pressed, POST request submits form details
  const confirmDetails = async (e) => {
    e.preventDefault();
    const json = JSON.stringify(form);

    axios
      .put(ACCOUNT_REST_API_URL, json, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        console.log(response);
        alert("You have changed details succesfully.");
        window.location.reload();
      })
      .catch(function (error) {
        alert("Details could not be changed. Please try again.");
        console.log(error);
      });
  };

  // Delete button
  const deleteAccount = async (e) => {
    e.preventDefault();

    // Ask user twice to confirm before account deletion
    let choice = confirm(
      "Do you really want to delete your account? All your data will be erased permenantely and cannot be retrieved."
    );
    if (choice == true) {
      choice = confirm(
        "Are you really sure you wish to PERMENANTLY DELETE your account. This CANNOT BE UNDONE?"
      );
      if (choice == true) {
        axios
          .delete(ACCOUNT_REST_API_URL)
          .then((res) => {
            alert("Account has been deleted successfully.");
            localStorage.clear();
            navigate("/");
          })
          .catch((error) => {
            alert("Account couldnt be deleted. Please try again.");
            console.log(error);
          });
      }
    }
  };

  // Logout button
  const logOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("basket");
    localStorage.removeItem("userOrder");
    alert("You have successfully been logged out, redirecting to home page.");
    navigate("/");
  };

  if (localStorage.getItem("userId") !== null) {
    return getData();
  } else {
    return (
      <ErrorMessage
        title="You're not logged in"
        subtitle={
          <p>
            Please either <a href="/login">Login</a> or{" "}
            <a href="/signup">Sign up</a>.
          </p>
        }
      />
    );
  }
};

export default AccountMangement;
