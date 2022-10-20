import axios from 'axios'

const PRODUCT_REST_API_URL = 'https://localhost:5000/products'

class ShopService {

    getProducts(){
        axios.get(PRODUCT_REST_API_URL);
    }
}

export default new ShopService()