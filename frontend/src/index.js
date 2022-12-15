import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
import axios from 'axios';
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Account from "./Pages/Account";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap-icons/font/bootstrap-icons.css";
import Shop from "./Pages/Shop";
import ProductList from "./Components/ProductList";
import Order from './Pages/Order';

const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(queryKey);
  return data;
};

const queryClient = new QueryClient({
  defaultOptions: { queries: { queryFn: defaultQueryFn } }
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="shop" element={<Shop />} />
            <Route path="signup" element={<Signup />} />
            <Route path="accounts" element={<Account />} />
            <Route path="orders" element={<Order />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
