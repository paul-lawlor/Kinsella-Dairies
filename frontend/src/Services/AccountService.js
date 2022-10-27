import axios from "axios";


class AccountService {
  getAccount() {
    const ACCOUNT_REST_API_URL = "http://localhost:5000/accounts/";
    return axios.getAccountByID(ACCOUNT_REST_API_URL);
  }
}

export default new AccountService();
