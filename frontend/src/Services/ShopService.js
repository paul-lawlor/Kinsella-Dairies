import axios from "axios";
import react from 'react';

const PRODUCT_REST_API_URL = "http://localhost:5000/products";

class ShopService {
  getProducts() {
    return axios.get(PRODUCT_REST_API_URL);
  }

  getProductByID(productID) {
    return axios.get(PRODUCT_REST_API_URL+"/"+productID)
  }
}

export default new ShopService();
