import React from 'react'

const ProductListItem = (props) => {

const products = props.products;

const addToBasket = (products) => {
    // Add quantity property to products obj
    products.quantity = 1;

    //creating local storage item if it doesn't already exist
    if (
      localStorage.getItem("basket") === null ||
      localStorage.getItem("basket") === undefined
    ) {
      const array = [];
      localStorage.setItem("basket", JSON.stringify(array));
    }

    // get current basket
    let currentBasket = JSON.parse(localStorage.getItem("basket"));

    // If there are items in the basket
    if (currentBasket.length > 0) {
      let found = false;

      // Loop for all items in basket
      for (let i = 0; i < currentBasket.length; i++) {
        // If current item and item we want to add share the same name
        // Add 1 to quantity
        if (currentBasket[i].productName === products.productName) {
          if (
            currentBasket[i].quantity < 10 &&
            currentBasket[i].quantity < products.stock
          ) {
            currentBasket[i].quantity += 1;
            localStorage.setItem("basket", JSON.stringify(currentBasket));
          } else {
            alert("You can't add any more of this item to your order")
            return "Max item limit reached";
          }
          found = true;
        }
      }

      // If item we are adding wasnt in basket, add it as new item
      if (found === false) {
        currentBasket.push(products);
        localStorage.setItem("basket", JSON.stringify(currentBasket));
      }

      // If the basket is empty, add item
    } else {
      currentBasket.push(products);
      localStorage.setItem("basket", JSON.stringify(currentBasket));
    }

    window.location.reload();
  };
    
  if (products.stock >= 1){
  return (
    <div
            className="singleproduct shadow-sm d-flex flex-column justify-content-between bg-light p-2 m-1 rounded-3"
            key={products.productID}
          >
            <h5> {products.productName}</h5>
            <img className="pimage rounded-2" src={products.image}></img>
            <h6> £{products.price}</h6>
            <h6> In stock: {products.stock}</h6>
            <button
              className="btn btn-secondary"
              onClick={() => addToBasket(products)}
            >
              Add to Cart
            </button>
          </div>
  )
}
else {
    return (
        <div
                className="singleproduct shadow-sm d-flex flex-column justify-content-between bg-light p-2 m-1 rounded-3"
                key={products.productID}
              >
                <h5> {products.productName}</h5>
                <img className="pimage rounded-2" src={products.image}></img>
                <h6> £{products.price}</h6>
                <h6> OUT OF STOCK</h6>
                
              </div>
      )
}
}

export default ProductListItem