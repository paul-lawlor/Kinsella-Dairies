import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import AccountService from "../Services/AccountService";

const AccountMangement = () => {

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        addressLineOne: '',
        addressLineTwo: '',
        postcode: '',
        password: ''
    });

    
    const ACCOUNT_REST_API_URL = "http://localhost:5000/accounts/"+localStorage.getItem('userId');
    
    axios.get(ACCOUNT_REST_API_URL)
    .then(function (response) {
        const password= JSON.stringify(response.data);
        // const parsed = JSON.parse(account)
        //console.log(response.data[0].userID);
        setUserData({
            firstName: response.data[0].firstName,
            lastName: response.data[0].lastName,
            phoneNumber: response.data[0].phoneNumber,
            addressLineOne: response.data[0].addressLineOne,
            addressLineTwo: response.data[0].addressLineTwo,
            postcode: response.data[0].postcode,
            password: response.data[0].password
        });
    })
    
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        addressLineOne: '',
        addressLineTwo: '',
        postcode: '',
        password: ''
    });

    //when button is pressed, POST request submits form details
    const confirmDetails = async(e) => {

        e.preventDefault()

        const json = JSON.stringify(form);
      
        axios.post(ACCOUNT_REST_API_URL, json, {
            headers: {'Content-Type': 'application/json'}
        })
        .then(function (response) {
            console.log(response);
            //alert('You have changed details succesfully.')
            //window.location.href = "http://localhost:3000/login"
        })
        .catch(function (error) {
            //alert('Details could not be changed. Please try again.')
            console.log(error);
        });
    }

    const logOut = () => {
        localStorage.removeItem('userId');
        alert("You have successfully been logged out, redirecting to home page.");
        window.location.href="http://localhost:3000/home";
    }

    if(localStorage.getItem('userId') !== null){
  return (
    <>
        <h1 className="mx-3 mt-3">Accounts Management</h1>

        <form onSubmit={confirmDetails}>

<div className="name-entry p-3 d-flex flex-column">
    <div className="d-flex my-1">
    <div className="firstName d-flex flex-column m-1 w-100">
    <label>First name - Current: {userData.firstName}</label>
    <input
        className="w-100"
        value={form.firstName}
        onChange={e => {
            setForm({
            ...form,
            firstName: e.target.value
            });
       
        }}
    />
    </div>
    <div className="lastName d-flex flex-column m-1 w-100">
    <label>Last name - Current: {userData.lastname}</label>
    <input
        className="w-100"
        value={form.lastName}
        onChange={e => {
            setForm({
            ...form,
            lastName: e.target.value
            });
        
        }}
        />
    </div>
    </div>
    <div className="phoneNumber d-flex flex-column m-1 w-100">
    <label>Phone Number - Current: {userData.phoneNumber}</label>
        <input
        value={form.phoneNumber}
        onChange={e => {
            setForm({
            ...form,
            phoneNumber: e.target.value
            });
         
        }}
        />
    </div>
</div>

<div className="address-entry p-3">
<div className="addresses d-flex flex-column m-1">
<label>Address Line 1 - Current: {userData.addressLineOne}</label>
    <input
    className="w-100"
    value={form.addressLineOne}
    onChange={e => {
        setForm({
        ...form,
        addressLineOne: e.target.value
        });
        
    }}
    />

<label>Address Line 2 - Current: {userData.addressLineTwo}</label>
<input
    className="w-100"
    value={form.addressLineTwo}
    onChange={e => {
        setForm({
            ...form,
            addressLineTwo: e.target.value
        });
    
    }}
    />
</div>

<div className="d-flex flex-column m-1">
<label>Postcode - Current: {userData.postcode}</label>
<input
    className="w-50"
    value={form.postcode}
    onChange={e => {
        setForm({
        ...form,
        postcode: e.target.value
        });
    
    }}
    />
</div>
</div>

<div className="password d-flex flex-column p-3 m-1">
<label>Password - Current: {userData.password}</label>
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

<div className="d-flex justify-content-between">
    <div className="p-3 py-1">
    <button type="submit" className="btn btn-primary m-1" >Update Account Info</button>
    <button className="btn btn-danger m-1" >Delete Account</button>
    </div>
    <div className="p-3 py-1">
    <button className="btn btn-secondary m-1" onClick={logOut} >Logout</button>
    </div>
</div>
</form>
    </>
  )}
  else{
    return(
        <h2>You are not logged in. Please either sign up or log in.</h2> 
    );
  }
}

export default AccountMangement