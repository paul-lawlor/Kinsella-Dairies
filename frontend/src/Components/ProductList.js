import React, { useEffect } from "react";
import ShopService from "../Services/ShopService";
import { useState } from 'react';

const ProductList = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {   
    ShopService.getProducts().then((response) => {
      setProduct({ products: response.data });
  });
  }, [])

  const addToBasket = (products) => {

    //creating local storage item if it doesn't already exist
    if (localStorage.getItem('basket') === null) {
      const array = []
      localStorage.setItem('basket', JSON.stringify(array));
    }


    // Add id to basket
    let currentBasket = JSON.parse(localStorage.getItem('basket'));
    currentBasket.push(products);
    localStorage.setItem('basket',JSON.stringify(currentBasket));
    console.log(localStorage.getItem('basket')); // Logs current basket


    //window.location.reload()
  
  }
    
    return (
     
      <div className = "products">
            {product.products?.map((products) => (
              <div className="singleproduct"key={products.productID}>
                <h5> {products.productName}</h5>
                <img className="pimage" src ={products.image}></img>
                <h6> £{products.price}</h6>
                <button onClick={() => addToBasket(products)}>Add to Cart</button>
              </div>
            ))}
      </div>
    );
  
}

export default ProductList;
