import React from "react";
import { useQuery } from "react-query";
import confused from "../Images/confused.png";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const AdminUpdateProduct = (props) => {
  const product = props.product;

  const ADMIN_REST_API_URL = "http://localhost:5000/admin/" + product.productID;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //useState for the form (within the modal)
  const [form, setForm] = useState({
    productName: product.productName,
    price: product.price,
    image: product.image,
  });

  //function which submits the form
  const submitForm = async (e) => {
    let json = form;

    // If no image is supplied, use a default image
    if (json.image === "") {
      json.image =
        "https://cdn-icons-png.flaticon.com/512/1250/1250555.png?w=1380&t=st=1669718137~exp=1669718737~hmac=8a9d31782292a7ad864eefb9c7994095988d8024811d3c5d388ec874f561ed44";
    }

    console.log(props.product);
    json = JSON.stringify(json);

    axios
      .put(ADMIN_REST_API_URL, json, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        console.log(response);
        alert("You have updated the product succesfully.");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(product.productName)
        alert("Product could not be updated. Please try again.");
        console.log(error);
      });

    handleClose();
  };

  return (
    <>
      <button className="btn btn-secondary" onClick={handleShow}>
        Update
      </button>

      <Modal style={{ opacity: 1 }} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="ModalHeader">Update Product</Modal.Title>
        </Modal.Header>
        <form onSubmit={submitForm}>
          <Modal.Body>
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

export default AdminUpdateProduct;
