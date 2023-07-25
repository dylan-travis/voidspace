import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import axios from 'axios';
import getStripe from './get-stripe';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@mui/material';
import CheckoutForm from '../components/CheckoutForm';


const cartDetails = {
    'price_1NQcKtK1A3hq7BalXT5wvjyv': {
        id: 'price_1NQcKtK1A3hq7BalXT5wvjyv',
        name: 'Two Hours',
        description: 'Two hour booking',
        image: 'https://i1.wp.com/cornellsun.com/wp-content/uploads/2020/06/1591119073-screen_shot_2020-06-02_at_10.30.13_am.png',
        currency: 'USD',
        price: 60,
        formattedValue: '$60.00',
        value: 1000,
        quantity: 1,
        totalPrice: "60.00",
        selectedHourBegin: "10:00",
        selectedHourEnd: "12:00",
        day: "2023-10-10"
    }
}

const Cart = () => {
    const [redirecting, setRedirecting] = useState(false);

    function removeItem(product, quantity){
        console.log("remove " + product + quantity)
    }

    const redirectToCheckout = async () => {
        // Create Stripe checkout
        const requestData = {
            items: Object.entries(cartDetails).map(([_, { id, price, quantity }]) => ({
              id: id,
              price: price,
              quantity,
            })),
          };
          console.log('POST Request Data:', requestData);
      
          // Make the POST request to create a Stripe checkout session
          const response = await axios.post('/api/checkout_sessions', requestData);
      
          // Destructure the 'id' property from the response
          const { data: { id } } = response;
          
        // Redirect to checkout
        const stripe = await getStripe();
      
        const { error } = await stripe!.redirectToCheckout({
            // Make the id field from the Checkout Session creation API response
            // available to this file, so you can provide it as parameter here
            // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
            sessionId: id,
          });
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `error.message`.
          console.warn(error.message);
        };
        
    


    return (
        <>
            <Head>
                <title>My Shopping Cart | Figueroa Studios</title>
            </Head>
            {/* Main Div */}
            <div className="container xl:max-w-screen-xl mx-auto py-12 px-6">
            {Object.keys(cartDetails).length != 0 && (
                    <>
                        <h2 className="text-4xl font-semibold text-center">Your shopping cart</h2>
                    </>)}
                {/* Product Banner */}
                <div className="mt-12">
                    {Object.entries(cartDetails).map(([key, product]) => (
                        <div
                            key={key}
                            className="flex justify-between space-x-4 hover:shadow-lg hover:border-opacity-50 border border-opacity-0 rounded-md p-4"
                        >
                            {/* Image + Name */}

                            <a className="flex items-center space-x-4 group">
                                <div className="relative w-20 h-20 group-hover:scale-110 transition-transform">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={80}
                                        height={80}
                                    />
                                </div>
                                <p className="font-semibold text-xl group-hover:underline">
                                    {product.name}
                                </p>
                                <p className="text-gray-500  italic">{product.selectedHourBegin} - {product.selectedHourEnd}, <span className="font-semibold">{product.day}</span></p>
                            </a>
                            {/* Quantity */}
                            <div className="flex items-center space-x-3">
                                {/* Price */}
                                <p className="font-semibold text-xl ml-16">

                                    ${(product.price)}
                                </p>

                                {/* Remove item */}
                                <button
                                    onClick={() => removeItem(product, product.quantity)}
                                    className="ml-4 hover:text-rose-500"
                                >
                                    <DeleteIcon className="w-6 h-6 flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Checkout and Clear Buttons */}
                     {Object.keys(cartDetails).length != 0 && (
                    <div className="pt-8 text-center">
                        <Button
                            variant="contained" color="primary" 
                            onClick={redirectToCheckout}
                        >
                            Checkout
                        </Button>
                        <Button variant="contained" color="primary" >
                            Clear all
                        </Button>
                    </div>)}
                {Object.keys(cartDetails).length == 0 && (
                    <>
                        <h2 className="text-4xl font-semibold pt-8 pb-8">
                            Your shopping cart is empty.
                        </h2>
                        <p className="mt-1 text-xl">
                            More details below.{' '}
                            <Link href="/">

                            </Link>
                        </p>
                    </>
                )}
            </div>
        </>)
};     
        


export default Cart;