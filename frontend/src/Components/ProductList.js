import React, { useEffect } from "react";
import ShopService from "../Services/ShopService";
import { useState } from "react";
import { useQuery } from "react-query";
import ProductListItem from "./ProductListItem";

const ProductList = () => {
  // Defining API URL for later use when targeting the 'products' endpoint
  const PRODUCT_REST_API_URL = "http://localhost:5000/products";

  //function to
  const getData = () => {
    const { isLoading, error, data } = useQuery(PRODUCT_REST_API_URL); //setting query key to products endpoint

    if (isLoading) return "Loading...";

    if (!data?.[0] || error) {
      return (
      <ErrorMessage
        title="There's a problem with our shop at the moment..."
        subtitle="Please try again later."
      />
      );
    }

    return (
      <div className="products">
        {data?.map((products) => (
          <ProductListItem products={products}/>
        ))}
      </div>
    );
  };

  return getData();
};

export default ProductList;
