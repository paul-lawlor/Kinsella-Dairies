import React, { useEffect } from "react";
import ShopService from "../Services/ShopService";
import { useState } from 'react';

const ProductList = () => {
  const [product, setProduct] = useState([]);
  const [basket, setBasket] = useState([]);

  useEffect(() => {   
    ShopService.getProducts().then((response) => {
      setProduct({ products: response.data });
  });
  }, [])

  const addToBasket = (products) => {
    console.log('add to basket')
    setBasket([...basket, { ...products }])
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
