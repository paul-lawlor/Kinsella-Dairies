import React from "react";
import { useQuery } from "react-query";
import confused from "../Images/confused.png";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const AdminCreateProduct = () => {

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
    stock: "",
  });

  // useState for image
  const [image, setImage] = useState(null);

  // useStaet for price
  const [formPrice, setFormPrice] = useState(0);

  //function which submits the form
  const submitForm = async (e) => {
    e.preventDefault();

    // Create image body data
    let bodyFormData = new FormData();
    bodyFormData.append('image',image);
    bodyFormData.append('name',form.productName);
    bodyFormData.append('price',form.price);
    bodyFormData.append('stock',form.stock);

    const CREATE_PRODUCT_API_URL = "http://localhost:5000/admin/add";

    await axios
      .post(CREATE_PRODUCT_API_URL, bodyFormData, {
        headers: { "Content-Type": "multipart/form-data" },
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
      stock: "",
    });

    setImage(null);

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
            <label className="d-flex flex-column m-2"> Product Name 
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
              </label>
            </div>
            <div>
              <label className="d-flex flex-column m-2 w-25"> Price 
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
              </label>
            </div>
            <div>
              <label className="d-flex flex-column m-2"> Image 
              <p className="text-secondary">(Drag and drop or select a file)</p>
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
              <label className="d-flex flex-column m-2"> Initial Stock Level 
              <input
                className="w-25"
                required
                value={form.stock}
                onChange={(e) => {
                  setForm({
                    ...form,
                    stock: e.target.value,
                  });
                }}
              />
              </label>
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
