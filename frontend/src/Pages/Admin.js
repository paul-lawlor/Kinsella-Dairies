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

const Admin = () => {
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
      <AdminCreateProduct />
      <div className="products">
        {data?.map((products) => (
          <div
            className="singleproduct shadow-sm d-flex flex-column justify-content-between bg-light p-2 m-1 rounded-3"
            key={products.productID}
          >
            <h5> {products.productName}</h5>
            <img className="pimage rounded-2" src={products.image}></img>
            <h6> £{products.price}</h6>
            <h6>
              {" "}
              In Stock: {products.stock} <StockManagement product={products} />{" "}
            </h6>

            <AdminDeleteProduct productID={products.productID} />
            <AdminUpdateProduct product={products} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Admin;
