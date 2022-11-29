import React from "react";
import { useQuery } from "react-query";
import confused from "../Images/confused.png";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const PRODUCT_REST_API_URL = "http://localhost:5000/products";

const Admin = () => {
  //useState for the modal form
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //useState for the form (within the modal)
  const [form, setForm] = useState({
    productName: "",
    price: "",
    image: "image not found",
  });

  //function which submits the form
  const submitForm = async (e) => {
    e.preventDefault();

    const json = JSON.stringify(form);

    console.log(json);

    axios
      .post(PRODUCT_REST_API_URL, json, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        alert("You have addded a new product!");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Defining API URL for later use when targeting the 'products' endpoint
  const PRODUCT_REST_API_URL = "http://localhost:5000/products";

  const { isLoading, error, data } = useQuery(PRODUCT_REST_API_URL); //setting query key to products endpoint

  if (isLoading) return "Loading...";

  // we need to change this error!
  if (!data?.[0] || error) {
    return (
      <div className="p-3 d-flex">
        <img src={confused} width="130" height="130" className="rounded-2" />
        <div className="d-flex flex-column mx-3 align-self-center">
          <h2>Whoops! There's a problem with our Shop page at the moment...</h2>
          <h3>Try again later.</h3>
          <p>
            Please either <a href="/login">Login</a> or{" "}
            <a href="/signup">Sign up</a>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="products">
      {data?.map((products) => (
        <div
          className="singleproduct shadow-sm d-flex flex-column justify-content-between bg-light p-2 m-1 rounded-3"
          key={products.productID}
        >
          <h5> {products.productName}</h5>
          <img className="pimage rounded-2" src={products.image}></img>
          <h6> £{products.price}</h6>
        </div>
      ))}
      <button className="btn btn-secondary" onClick={handleShow}>
        Add Product
      </button>

      <Modal
        style={{ opacity: 1 }}
        animation={false}
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="ModalHeader">Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitForm}>
            <div>
              <label> Product Name </label>
              <input
                value={form.productName}
                onChange={(e) => {
                  setForm({
                    ...form,
                    productName: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <label> Price </label>
              <input
                value={form.price}
                onChange={(e) => {
                  setForm({
                    ...form,
                    price: e.target.value,
                  });
                }}
              />
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Admin;
