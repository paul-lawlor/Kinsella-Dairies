import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import css from '../Pages/App.css'

const LoginForm = () => {

  const ACCOUNT_REST_API_URL = "http://localhost:5000/login";

  const [form, setForm] = useState({

    phoneNumber: '',
    password: ''
});

const submitForm = async(e) => {

  e.preventDefault()

  const json = JSON.stringify(form);

  axios.post(ACCOUNT_REST_API_URL, json, {
      headers: {'Content-Type': 'application/json'}
  })
  .then(function (response) {
      console.log(response.data);
      if (response.data.substring(0,1) === "t"){
        console.log(response);
        localStorage.setItem('userId',response.data.slice(2));
        console.log(localStorage.getItem('userId'));
        window.location.href = "http://localhost:3000/accounts/"
      }
  })
  .catch(function (error) {
      console.log(error);
      alert("Invalid phone number or password entered, please try again.")
  });
}

  return (
    <>
      
      <div className="d-flex justify-content-around">
        <div className="form-area d-flex flex-column w-50">

          <h2 className="mx-3 mt-3">Login</h2>
          <form className="p-2" onSubmit={submitForm}>
            
          <div className="d-flex flex-column m-1">
          <label>Phone Number</label>
          <input
              value={form.phoneNumber}
              onChange={e => {
                  setForm({
                  ...form,
                  phoneNumber: e.target.value
                  });
              }}
              />

          <label>Password</label>
          <input
              type = "password"
              value={form.password}
              onChange={e => {
                setForm({
                  ...form,
                  password: e.target.value
                });
              }}
              />
          </div>
          
          <div className="mt-3">
            <button type="submit" className="btn btn-primary m-1" >Login</button>
          </div>
          </form>
          <p className="text-right mx-3">
              Don't have an account yet <a href="/Signup">sign up?</a>
          </p>

          </div>

          <div className="info-area w-50 p-2">
              <h3>How to log in</h3>
              <p>
                To log in, please enter the phone number and password associated with your
                Kinsella Dairies online account. 
                <br/><br/>
                Use your mouse to navigate over to the box under Phone Number, left-click on
                it, and then type in your phone number. Once you have done this, do the same
                for the Password box.
                <br/><br/>
                After you have entered information into both boxes, move your mouse over to the
                <b> Login</b> button and click it. Ensure the information you have entered is 
                correct
                <br/><br/>
                <p>If you don't already have an account with Kinsella Dairies, please proceed to
                the <b>Sign Up</b> page.</p>
                </p>
          </div>
        </div>
  
    </>
  );
}

export default LoginForm