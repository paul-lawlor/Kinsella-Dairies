import React from "react";
import ShopService from "../Services/ShopService";
import LoginForm from "./LoginForm";

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    ShopService.getProducts().then((response) => {
      this.setState({ products: response.data });
    });
  }

  render() {
    return (
      <div className="row">
        <h1 className="text-center"> Products </h1>
        <table className="table ">
          <thead>
            <tr>
              <td>Product Id</td>
              <td>Product Name</td>
              <td>Product Price</td>
            </tr>
          </thead>
          <tbody>
            {this.state.products?.map((products) => (
              <tr key={products.productID}>
                <td> {products.productID}</td>
                <td> {products.productName}</td>
                <td> £{products.price}</td>
                <button>Add to Cart</button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProductList;
