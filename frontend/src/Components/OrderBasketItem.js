import React from 'react'
import { useState, useEffect } from 'react';
import ShopService from "../Services/ShopService";
import axios from 'axios';

const OrderBasketItem = (props) => {

    let price = props.product?.price * props.product?.quantity

    return (
        <div className="d-flex align-items-center p-2 m-2 bg-white rounded-2">
            <img className="rounded-2 m-2" src={props.product?.image} width="75" height="75"/>
            <div className="mx-2">
                <p><b>{props.product?.productName}</b>    £{price.toFixed(2)}</p>
                <p> Quantity X {props.product?.quantity} </p>
            </div>
        </div>
    );

    }

    export default OrderBasketItem