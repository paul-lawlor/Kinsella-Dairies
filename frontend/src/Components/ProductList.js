import React, { useEffect } from "react";
import ShopService from "../Services/ShopService";
import { useState } from 'react';

const ProductList = () => {
  const [basket, setBasket] = useState([]);

  useEffect(() => {   
    ShopService.getProducts().then((response) => {
      setBasket({ products: response.data });
  });
  }, [])

  const addToBasket = (products) => {
    console.log('add to basket')
    setBasket([...basket, products])
  }
    
    return (
     
             
      <div className = "products">
            {basket.products?.map((products) => (
              <div key={products.productID}>
                <h5> {products.productName}</h5>
                <h6> £{products.price}</h6>
                <img src ={products.image}></img>
                <button onClick={() => addToBasket(products)}>Add to Cart</button>
              </div>
            ))}
      </div>
    );
  
}

export default ProductList;
