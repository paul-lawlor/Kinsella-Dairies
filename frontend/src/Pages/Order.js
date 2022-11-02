import React from 'react'

const Order = () => {

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
    } else {
    return (
        <div>Order</div>
    );
    }
}

export default Order