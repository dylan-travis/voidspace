import React from 'react';

const Cart = ({ cart, toggleCart, clearCart }) => {
    return (
        <div className="cart">
            <button onClick={toggleCart}>Toggle Cart</button>
            <button onClick={clearCart}>Clear Cart</button>
            <ul>
                {cart?.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;