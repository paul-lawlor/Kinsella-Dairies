import React from 'react'
import { useState } from 'react';
import axios from 'axios';

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
      console.log(response);
      alert("Login worked")
      //window.location.href = "http://localhost:3000/login"
  })
  .catch(function (error) {
      console.log(error);
      alert("Login didnt work")
  });
}

  return (
    <>
      <div className="signup-area">
        <div className="form-area">
          
          <form className="p-2" onSubmit={submitForm}>
          

        <label>
            Email:
            <input
            value={form.email}
            onChange={e => {
                setForm({
                ...form,
                phoneNumber: e.target.value
                });
            }}
            />
        </label>

        <label>
            Password:
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
        </label>
        <button type="submit" className="btn btn-primary" >Sign Up</button>
        </form>
        </div>
        </div>
    </>
  );
}

export default LoginForm