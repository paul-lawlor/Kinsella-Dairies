import React from "react";
import { useQuery } from "react-query";
import confused from "../Images/confused.png";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const AdminUpdateProduct = (props) => {
  const product = props.product;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //useState for the form (within the modal)
  const [form, setForm] = useState({
    productName: product.productName,
    price: product.price,
  });

  // useState for Image
  const [image, setImage] = useState(null);

  //function which submits the form
  const submitForm = async (e) => {
    e.preventDefault();

    const UPDATE_REST_API_URL = "http://localhost:5000/admin/update"

    // Create image body data
    let bodyFormData = new FormData();
    bodyFormData.append('image',image);
    bodyFormData.append('id',product.productID);
    bodyFormData.append('name',form.productName);
    bodyFormData.append('price',form.price);

    // Update Request
    await axios
      .put(UPDATE_REST_API_URL, bodyFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(function (response) {
        console.log(response);
        alert("You have updated the product succesfully.");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(product.productName);
        alert("Product could not be updated. Please try again.");
        console.log(error);
      });

    handleClose();
  };

  return (
    <>
      <button
        className="btn btn-primary w-100 fw-bold mt-2"
        onClick={handleShow}
      >
        Update
      </button>

      <Modal style={{ opacity: 1 }} animation={false} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="ModalHeader">Update Product</Modal.Title>
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
            <label> 
              Image 
              <input
                required
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </label>
            </div>
            <div>
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
