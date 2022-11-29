import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const StockManagement = (props) => {
  const product = props.product;

  const ADMIN_REST_API_URL =
    "http://localhost:5000/admin/stock/" + product.productID;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //useState for the form (within the modal)
  const [form, setForm] = useState({
    stock: product.stock,
  });

  //function which submits the form
  const submitForm = async (e) => {
    let json = JSON.stringify(form);

    axios
      .put(ADMIN_REST_API_URL, json, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        console.log(response);
        alert("You have updated the stock level succesfully.");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(product.stock);
        alert("Stock could not be updated. Please try again.");
        console.log(error);
      });

    handleClose();
  };

  return (
    <>
      <button className="btn btn-secondary" onClick={handleShow}>
        Update Stock
      </button>

      <Modal style={{ opacity: 1 }} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="ModalHeader">Update Stock</Modal.Title>
        </Modal.Header>
        <form onSubmit={submitForm}>
          <Modal.Body>
            <div>
              <label> Stock Level </label>
              <input
                value={form.stock}
                onChange={(e) => {
                  setForm({
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

export default StockManagement;
