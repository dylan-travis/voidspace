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
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfToday,
} from 'date-fns'
import { useSession } from "next-auth/react"
import formatHoursTo12HourClock from '../utils/24hr';

let cartDetails = {}
    
export async function getServerSideProps() {
        try {
            const response = await fetch('http://localhost:3000/api/getBookings');
            const bookings = await response.json();
            // console.log(bookings)
            return { props: { bookings } };
        } catch (e) {
            console.error(e);
        }
    }
    

const Cart = ({bookings}) => {
    const [redirecting, setRedirecting] = useState(false);
    const { data: session } = useSession()
    const [cartDetails, setCartDetails] = useState(bookings); // Store the cart items in state

    if (session) {
        const userId = session.user.id;
    }

    async function removeItem(product, quantity) {
        // console.log("remove " + JSON.stringify(product, quantity));
    
        try {
          await fetch(`/api/deleteBooking?_id=${product._id}`, {
            method: "DELETE"
          });
          
          // If the item is successfully deleted from the backend, remove it from the cartDetails state.
          setCartDetails((prevCartDetails) => {
            const updatedCart = { ...prevCartDetails };
            delete updatedCart[product._id];
            return updatedCart;
          });
          
        } catch (error) {
          console.error(error);
        }
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
                                        src="/blacksquare.jpg"
                                        alt={product.productName}
                                        width={80}
                                        height={80}
                                    />
                                </div>
                                <p className="font-semibold text-xl group-hover:underline">
                                    {product.productName}
                                </p>
                                <p className="text-gray-500  italic">{format(parseISO(product.bookingDate), 'dd MMMM, yyyy')}, <span className="font-semibold">{formatHoursTo12HourClock(product.bookingHour)} - {formatHoursTo12HourClock(product.endBookingHour)}</span></p>

                            </a>
                            {/* Quantity */}
                            <div className="flex items-center space-x-3">
                                {/* Price */}
                                <p className="font-semibold text-xl ml-16">

                                    ${(product.productPrice)}
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
                        <h2 className="text-4xl font-semibold pb-8">
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