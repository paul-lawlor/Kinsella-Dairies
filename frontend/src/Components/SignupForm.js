import React from 'react'
import { useState } from 'react';
import axios from 'axios';


const SignupForm = () => {

    const ACCOUNT_REST_API_URL = "http://localhost:5000/accounts";

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        addressLineOne: '',
        addressLineTwo: '',
        postcode: '',
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
            alert('You have signed up successfully. Please now login.')
            window.location.href = "http://localhost:3000/login"
        })
        .catch(function (error) {
            console.log(error);
        });

        //console.log(res.data.data);


        //get data - each element defined manually(DOM)
        //post request - post body (JSON)
        //cleanup

        console.log(json);
        
    }



    return (
      
        <form onSubmit={submitForm}>
        <label>
            First name:
            <input
            value={form.firstName}
            onChange={e => {
                setForm({
                ...form,
                firstName: e.target.value
                });
            }}
            />
        </label>

        <label>
            Last name:
            <input
            value={form.lastName}
            onChange={e => {
                setForm({
                ...form,
                lastName: e.target.value
                });
            }}
            />
        </label>

        <label>
            Address Line 1:
            <input
            value={form.addressLineOne}
            onChange={e => {
                setForm({
                ...form,
                addressLineOne: e.target.value
                });
            }}
            />
        </label>

        <label>
            Address Line 2:
            <input
            value={form.addressLineTwo}
            onChange={e => {
                setForm({
                ...form,
                addressLineTwo: e.target.value
                });
            }}
            />
        </label>


        <label>
            Postcode:
            <input
            value={form.postcode}
            onChange={e => {
                setForm({
                ...form,
                postcode: e.target.value
                });
            }}
            />
        </label>

        <label>
            Phone Number:
            <input
            value={form.phoneNumber}
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
        
    );
}

export default SignupForm