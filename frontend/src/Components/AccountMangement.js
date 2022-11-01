import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import AccountService from "../Services/AccountService";
import confused from "../Images/confused.png";

const AccountMangement = () => {

    // Api URL
    const ACCOUNT_REST_API_URL = "http://localhost:5000/accounts/"+localStorage.getItem('userId');

    // Use states
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        addressLineOne: '',
        addressLineTwo: '',
        postcode: '',
        password: ''
    });

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        addressLineOne: '',
        addressLineTwo: '',
        postcode: '',
        password: ''
    });

    // On load, populate data
    window.onload = (event) => {
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
            setForm({
                firstName: response.data[0].firstName,
                lastName: response.data[0].lastName,
                phoneNumber: response.data[0].phoneNumber,
                addressLineOne: response.data[0].addressLineOne,
                addressLineTwo: response.data[0].addressLineTwo,
                postcode: response.data[0].postcode,
                password: response.data[0].password
            })
        });
    }

    //when update button is pressed, POST request submits form details
    const confirmDetails = async(e) => {

        e.preventDefault()
        const json = JSON.stringify(form);
      
        axios.put(ACCOUNT_REST_API_URL, json, {
            headers: {'Content-Type': 'application/json'}
        })
        .then(function (response) {
            console.log(response);
            alert('You have changed details succesfully.')
            window.location.reload();
        })
        .catch(function (error) {
            alert('Details could not be changed. Please try again.')
            console.log(error);
        });
    }

    // Delete button
    const deleteAccount = async(e) => {

        e.preventDefault()

        // Ask user twice to confirm before account deletion
        let choice = confirm("Do you really want to delete your account? All your data will be erased permenantely and cannot be retrieved.");
        if ( choice == true ) {
            choice = confirm("Are you really sure you wish to PERMENANTLY DELETE your account. This CANNOT BE UNDONE?");
            if (choice == true) {
                axios.delete(ACCOUNT_REST_API_URL)
                .then(res => {
                    alert("Account has been deleted successfully.");
                    localStorage.removeItem('userId');
                    window.location.href="http://localhost:3000/home";
                })
                .catch(error => {
                    alert("Account couldnt be deleted. Please try again.")
                    console.log(error);
                })
            }
        }
    }

    // Logout button
    const logOut = () => {
        localStorage.removeItem('userId');
        alert("You have successfully been logged out, redirecting to home page.");
        window.location.href="http://localhost:3000/home";
    }

    if(localStorage.getItem('userId') !== null) {
        return (
            <>
                <h1 className="mx-3 mt-3">Accounts Management</h1>

                <form onSubmit={confirmDetails}>

                <div className="name-entry p-3 d-flex flex-column">
                    <div className="d-flex my-1">
                    <div className="firstName d-flex flex-column m-1 w-100">
                    <label>First name</label>
                    <input
                        className="w-100"
                        defaultValue={userData.firstName}
                        onChange={e => {
                            setForm({
                            ...form,
                            firstName: e.target.value
                            });
                    
                        }}
                    />
                    </div>
                    <div className="lastName d-flex flex-column m-1 w-100">
                    <label>Last name</label>
                    <input
                        className="w-100"
                        defaultValue={userData.lastName}
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
                    <label>Phone Number</label>
                        <input
                        defaultValue={userData.phoneNumber}
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
                <label>Address Line 1</label>
                    <input
                    className="w-100"
                    defaultValue={userData.addressLineOne}
                    onChange={e => {
                        setForm({
                        ...form,
                        addressLineOne: e.target.value
                        });
                        
                    }}
                    />

                <label>Address Line 2</label>
                <input
                    className="w-100"
                    defaultValue={userData.addressLineTwo}
                    onChange={e => {
                        setForm({
                            ...form,
                            addressLineTwo: e.target.value
                        });
                    
                    }}
                    />
                </div>

                <div className="d-flex flex-column m-1">
                <label>Postcode</label>
                <input
                    className="w-50"
                    defaultValue={userData.postcode}
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
                <label>Password</label>
                <input
                defaultValue={userData.password}
                type = "password"
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
                    </div>
                    <div className="p-3 py-1">
                    <button onClick={deleteAccount} className="btn btn-danger m-1" >Delete Account</button>
                    <button className="btn btn-secondary m-1" onClick={logOut} >Logout</button>
                    </div>
                </div>
                </form>
        </>
  )}
  else{
    return(
        <div className="p-3 d-flex">
            <img src={confused} width="130" height="130" className="rounded-2"/>
            <div className="d-flex flex-column mx-3 align-self-center">
            <h2>You are not logged in</h2>
            <p>Please either <a href="/login">Login</a> or <a href="/signup">Sign up</a>.</p>
            </div>
        </div>
    );
  }
}

export default AccountMangement