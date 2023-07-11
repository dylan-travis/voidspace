// Create a React cart component. The cart component should conditionally display the items in the cart and be styled in Tailwind. The cart component should also conditionally display a message if the cart is empty. The cart component should also conditionally display a button that clears the cart when clicked. The cart component should be rendered in the App component.

import React from 'react';

const item = {
    name: 'item name',
    price: 1.99,
    quantity: 1,
    index: 0
}

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

// q: in this code, what does the toggleCart do?
// a: it toggles the cart. it's a function that's passed down from the App component. it's a function that toggles the cart's visibility.
// q: is toggleCart a prop, or a function?
//q: how would i call toggleCart elsewhere in the code?
