import React from "react";
import { useQuery } from "react-query";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AdminCreateProduct from "../Components/AdminCreateProduct";
import AdminDeleteProduct from "../Components/AdminDeleteProduct";
import AdminUpdateProduct from "../Components/AdminUpdateProduct";
import StockManagement from "../Components/StockManagement";
import ErrorMessage from "../Components/ErrorMessage";
import "./App.css";

const Admin = () => {
  // window.location.reload(false);
  // Defining API URL for later use when targeting the 'products' endpoint
  const PRODUCT_REST_API_URL = "http://localhost:5000/products";

  const { isLoading, error, data } = useQuery(PRODUCT_REST_API_URL); //setting query key to products endpoint

  if (isLoading) return "Loading...";

  // we need to change this error!
  if (!data?.[0] || error) {
    return (
      <ErrorMessage
        title="Whoops! There's a problem with our Shop page at the moment..."
        subtitle="Please try again later."
      />
    );
  }

  return (
    <>
      <div className="products m-5 px-5">
        {data?.map((products) => (
          <div
            className="singleProduct shadow-sm d-flex flex-column justify-content-between p-4 m-2 rounded-3"
            key={products.productID}
          >
            <div className="d-flex justify-content-between align-items-center">
              <h5> {products.productName}</h5>
              <AdminDeleteProduct productID={products.productID} />
            </div>
            <img className="pimage rounded-2 mb-2" src={products.image}></img>
            <h6> £{products.price}</h6>
            <div className="d-flex justify-content-between align-items-center rounded-2 my-1">
              <h6>In Stock: {products.stock}</h6>
              <StockManagement product={products} />
            </div>
            <AdminUpdateProduct product={products} />
          </div>
        ))}
      </div>
      <div className="d-flex mx-5 my-4 px-5 justify-content-center">
        <AdminCreateProduct />
      </div>
    </>
  );
};

export default Admin;
