import React from 'react'
import { useState, useEffect } from 'react';
import ShopService from "../Services/ShopService";
import axios from 'axios';

const BasketItem = (props) => {

    const removeItem = () => {
        let basket = JSON.parse(localStorage.getItem('basket'))
        basket.splice(props.index);
        localStorage.setItem('basket',JSON.stringify(basket));
        window.location.reload()
    }
    
    return (
        <div className="display-flex align-items-center p-1 m-1 bg-light rounded-2">
            <img className="rounded-2 m-1" src={props.product?.image} width="50" height="50"/>
            <p><b>{props.product?.productName}</b>    £{props.product?.price}</p>
            <button onClick={removeItem}> Remove Item from Basket </button>
        </div>
    )

    }

    export default BasketItem