import React from 'react'
import { useState, useEffect } from 'react';
import ShopService from "../Services/ShopService";
import axios from 'axios';

const BasketItem = (props) => {

    let itemIndex = parseInt(props.index)

    function removeItem(i) {

        let basket = JSON.parse(localStorage.getItem('basket'))

        if (basket[i].quantity > 1) {
            basket[i].quantity -= 1
        } else if (basket[i].quantity === 1) {
          basket.splice(i, 1);
        } 

        localStorage.setItem('basket',JSON.stringify(basket));
        window.location.reload()
        
    }

    function addItem(i) {

        let basket = JSON.parse(localStorage.getItem('basket'))

        console.log(basket[i].quantity)

        if (basket[i].quantity < 10){
            basket[i].quantity += 1
        } else {
             alert("Quantity has reached its maximum (10) for this item")
        }

        localStorage.setItem('basket',JSON.stringify(basket));
        window.location.reload()


    }

    let price = props.product?.price * props.product?.quantity
    price = price.toFixed(2)

    return (
        <div className="display-flex align-items-center p-1 m-1 bg-light rounded-2">
            <img className="rounded-2 m-1" src={props.product?.image} width="75" height="75"/>
            <p><b>{props.product?.productName}</b>    £{price}</p>
            <p> Quantity X {props.product?.quantity} </p>
            <button className="btn btn-danger m-1 w-" onClick={() => {
                console.log("remove")
                removeItem(itemIndex)}}> - </button>
            <button className="btn btn-secondary m-1" onClick={() => {
                console.log("add")
                addItem(itemIndex)}}> +</button>
        </div>
    );

    }

    export default BasketItem