import axios from "axios";

const PRODUCT_REST_API_URL = "http://localhost:5000/products";

class ShopService {
  getProducts() {
    return axios.get(PRODUCT_REST_API_URL);
  }
}

export default new ShopService();
