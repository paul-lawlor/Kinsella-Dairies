import React from 'react'
import { useState } from 'react';
import OrderBasketItem from '../Components/OrderBasketItem';
import axios from 'axios';
import confused from "../Images/confused.png";
import './App.css'

const Order = () => {

    const [orderData, setOrderData] = useState({})

    let total = 0.0;
    let orderBasketItems = [];

    if (localStorage.getItem('userOrder') !== null && localStorage.getItem('userOrder') !== "[object Object]") {

        let itemCount = (JSON.parse(localStorage.getItem('userOrder'))).length

        for (let i = 0; i < itemCount; i++) {

        let currentItem = JSON.parse(localStorage.getItem('userOrder'))[i]
        orderBasketItems.push(<OrderBasketItem product={currentItem} index={i}/>)
        total += (currentItem.price)*currentItem.quantity

        }
    }
    
    if (localStorage.getItem('userId') !== null) {
        window.onload = (event) => {
            let id = localStorage.getItem('userId')
            const orderUrl = "http://localhost:5000/orders/" + id
    
            axios.get(orderUrl)
            .then(function(response) {
                console.log(response.data.items);
                setOrderData(response.data)
    
                if (localStorage.getItem('userOrder') === null) {
                    localStorage.setItem('userOrder', [{}])
                }
                let order = JSON.parse(response.data.items);
                localStorage.setItem('userOrder', JSON.stringify(order))
    
            })
            .catch(function(error) {
                console.log(error);
            })
        }
    }

    
    const deleteOrder = () => {

        let choice = confirm("Do you really want to cancel your order?");
        if ( choice == true ) {
            const orderUrl = "http://localhost:5000/orders/" + orderData.orderID
            axios.delete(orderUrl)
            .then(function(response) {
                alert('Order has been cancelled successfully');
                localStorage.removeItem('userOrder')
                window.location.reload()
            });
        }
    }
    
    //delivery fee
    const delivery = 1
    total += delivery

    if(localStorage.getItem('userId') === null) {
    return(
        <div className="p-3 d-flex">
            <img src={confused} width="130" height="130" className="rounded-2"/>
            <div className="d-flex flex-column mx-3 align-self-center">
            <h2>You are not logged in</h2>
            <p>Please either <a href="/login">Login</a> or <a href="/signup">Sign up</a>.</p>
            </div>
        </div>
    );
    } else if (localStorage.getItem('userOrder') === null || localStorage.getItem('userOrder') === "[object Object]") {
        return(
            <div className="p-3 d-flex">
                <img src={confused} width="130" height="130" className="rounded-2"/>
                <div className="d-flex flex-column mx-3 align-self-center">
                <h2>You have not made an order yet</h2>
                <p>Please make an order at the <a href="/shop">shop</a>.</p>
                </div>
            </div>
        );
    } else {
    return (
        <>
        <div className="m-4 p-3 d-flex flex-column bg-light rounded-3 shadow">
            <h2>Your Current Order</h2>
            <h5>Order #{orderData.orderID}</h5>
            {orderBasketItems}
            <p className="mt-1 pt-2">Delivery Fee: £{delivery.toFixed(2)}</p>
            <b className="mb-1 pb-2">Total: £{total.toFixed(2)}</b>
            <p>Payment method: Cash</p>
            <div className="d-flex flex-column m-2">
                <small className="finePrint mb-1" >You must cancel 3 days before your next order, otherwise you will still be charged for it.</small>
                <button className="w-25 btn btn-danger" onClick={() => deleteOrder()}>Cancel Order</button>
            </div>
        </div>
        </>
        );
    }
}

export default Order