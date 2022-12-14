import React from "react";
import { useQuery } from "react-query";
import confused from "../Images/confused.png";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const AdminDeleteProduct = (props) => {
  const ADMIN_REST_API_URL = "http://localhost:5000/admin/" + props.productID;

  //function which submits the form
  const deleteProduct = async () => {
    // Ask user twice to confirm before account deletion
    let choice = confirm(
      "Do you really want to delete this product? It will be erased permenantely and cannot be retrieved."
    );
    if (choice == true) {
      choice = confirm(
        "Are you really sure you wish to PERMENANTLY DELETE this product. This CANNOT BE UNDONE?"
      );
      if (choice == true) {
        axios
          .delete(ADMIN_REST_API_URL)
          .then((res) => {
            alert("Product has been deleted successfully.");
          })
          .catch((error) => {
            alert("Product couldnt be deleted. Please try again.");
            console.log(error);
          });
      }
    }
  };

  return (
    <>
      <button
        className="btn btn-danger m-2"
        id="delete"
        onClick={deleteProduct}
      >
        X
      </button>
    </>
  );
};

export default AdminDeleteProduct;
