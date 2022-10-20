import React from 'react';
import ShopService from "../Services/ShopService";

class ProductList extends React.Component {

    constructor(){
        // eslint-disable-next-line no-this-before-super
        this.state = {
            products:[]
        }
    }

    componentDidMount(){
        ShopService.getProducts().then((response) => {
            this.setState({products: response.data})
        });
    }

render (){
    return (
        <div>
            <h1 className= "text-center"> products </h1>
            <table className = "table table-striped">
            <thead>
            <tr>
                <td>Product Id</td>
                <td>Product Name</td>
                <td>Product Price</td>
            </tr>
            
            
            </thead>
            <tbody>
                {
                    this.state.users.map(
                        products =>
                        <tr key = {products.productID}>
                            <td> {products.productID}</td>
                            <td> {products.productName}</td>
                            <td> {products.price}</td>
                            </tr>
                    )
                }
            </tbody>
            
            
            </table>
        
        
        </div>
    )




}

}

export default ProductList