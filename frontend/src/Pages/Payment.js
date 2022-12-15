import React from 'react'
import  { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import PaymentForm from '../Components/PaymentForm';
import Basket from '../Components/Basket';

const Payment = () => {
const navigate = useNavigate();
  const ACCOUNT_REST_API_URL = "http://localhost:5000/payment";

  const [form, setForm] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });




  return (
    <div>

    <div>Payments Page</div>

    <div className="payment">
        <div className='paymentForm'>
          <PaymentForm/>
        </div>
        
        
    </div>

    </div>

    


  )
}

export default Payment