import React, { useEffect } from "react";
import ShopService from "../Services/ShopService";
import { useState } from 'react';
import { useQuery } from "react-query";
import confused from "../Images/confused.png";

const ProductList = () => {
  // Defining API URL for later use when targeting the 'products' endpoint
  const PRODUCT_REST_API_URL = "http://localhost:5000/products"

  //Function which adds an item from the Product List to the Basket
  const addToBasket = (products) => {

    // Add quantity property to products obj
    products.quantity = 1

    //creating local storage item if it doesn't already exist
    if (localStorage.getItem('basket') === null || localStorage.getItem('basket') === undefined) {
      const array = []
      localStorage.setItem('basket', JSON.stringify(array));
    }

    // get current basket
    let currentBasket = JSON.parse(localStorage.getItem('basket'));

    // If there are items in the basket
    if (currentBasket.length > 0) {
      let found = false;

      // Loop for all items in basket
      for (let i = 0; i < currentBasket.length; i++){
        // If current item and item we want to add share the same name
        // Add 1 to quantity
        if (currentBasket[i].productName === products.productName) {
          if (currentBasket[i].quantity < 10) {
            currentBasket[i].quantity += 1
            localStorage.setItem('basket',JSON.stringify(currentBasket));
          } else {
            console.log("cant add item")
            return "Max item limit reached"
          }
          found = true
        }
      }

      // If item we are adding wasnt in basket, add it as new item
      if (found === false) {
        currentBasket.push(products);
        localStorage.setItem('basket',JSON.stringify(currentBasket));
      }

    // If the basket is empty, add item
    } else {
      currentBasket.push(products);
      localStorage.setItem('basket',JSON.stringify(currentBasket));
    }  

    window.location.reload()
  }
  
  //function to 
  const getData = () => {
    const { isLoading, error, data } = useQuery(PRODUCT_REST_API_URL); //setting query key to products endpoint

    if (isLoading) return "Loading...";

    if (!data?.[0] || error) {

      return (
        <>
        <div className="p-3 d-flex">
          <img
            src={confused}
            width="130"
            height="130"
            className="rounded-2"
          />
          <div className="d-flex flex-column mx-3 align-self-center">
            <h2>Whoops! There's a problem with our Shop page at the moment...</h2>
            <h3>Try again later.</h3>
            <p>
              Please either <a href="/login">Login</a> or{" "}
              <a href="/signup">Sign up</a>.
            </p>
          </div>
        </div>
      </>
      );
    }

    return (
      <div className = "products">
            {data?.map((products) => (
              <div className="singleproduct shadow-sm d-flex flex-column justify-content-between bg-light p-2 m-1 rounded-3"key={products.productID}>
                <h5> {products.productName}</h5>
                <img className="pimage rounded-2" src ={products.image}></img>
                <h6> £{products.price}</h6>
                <button className="btn btn-secondary" onClick={() => addToBasket(products)}>Add to Cart</button>
              </div>
            ))}
      </div>
    );
  };

  return getData();

}

export default ProductList;
