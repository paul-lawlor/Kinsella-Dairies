import React from "react";
import { useQuery } from "react-query";
import confused from "../Images/confused.png";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const AdminCreateProduct = () => {
  const ADMIN_REST_API_URL = "http://localhost:5000/admin";

  const poundFormatter = new Intl.NumberFormat("en-UK", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  const formatCurrency = (val) => poundFormatter.format(val);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //useState for the form (within the modal)
  const [form, setForm] = useState({
    productName: "",
    price: "",
    image: "",
    stock: "",
  });

  // useStaet for price
  const [formPrice, setFormPrice] = useState(0);

  //function which submits the form
  const submitForm = async (e) => {
    e.preventDefault();

    let json = form;

    // If no image is supplied, use a default image
    if (json.image === "") {
      json.image =
        "https://cdn-icons-png.flaticon.com/512/1250/1250555.png?w=1380&t=st=1669718137~exp=1669718737~hmac=8a9d31782292a7ad864eefb9c7994095988d8024811d3c5d388ec874f561ed44";
    }

    json = JSON.stringify(json);

    await axios
      .post(ADMIN_REST_API_URL, json, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        alert("You have addded a new product!");
      })
      .catch(function (error) {
        console.log(error);
      });

    setForm({
      productName: "",
      price: "",
      image: "",
      stock: "",
    });

    handleClose();
  };

  return (
    <>
      <button
        className="btn btn-success fw-bold fs-4 px-5 py-2 mb-3 w-50 shadow"
        onClick={handleShow}
      >
        Add a Product
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
        <form onSubmit={submitForm}>
          <Modal.Body>
            <div>
              <label> Product Name </label>
              <input
                required
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
                required
                value={form.price}
                type="number"
                min="0"
                step="0.01"
                onChange={(e) => {
                  setForm({
                    ...form,
                    price: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <label> Image URL </label>
              <input
                value={form.image}
                onChange={(e) => {
                  setForm({
                    ...form,
                    image: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <label> Initial Stock Level </label>
              <input
                required
                value={form.stock}
                onChange={(e) => {
                  setForm({
                    ...form,
                    stock: e.target.value,
                  });
                }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default AdminCreateProduct;
