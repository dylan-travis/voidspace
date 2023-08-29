import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import axios from 'axios';
import getStripe from '../utils/get-stripe';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@mui/material';
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
import { useSession, getSession } from "next-auth/react"
import formatHoursTo12HourClock from '../utils/24hr';

let cartDetails = {}
    
export async function getServerSideProps(context) {
    try {
      const session = await getSession(context);
      
      if (!session || !session.user) {
        // Handle the case where the user is not authenticated
        // You can redirect them to the login page or handle it as needed
        return {
          redirect: {
            destination: '/login', // Redirect to the login page
            permanent: false,
          },
        };
      }
      
      const userId = session.user.id;
      const cartApiUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL + `/api/getCart?userId=${userId}`;
      const response = await fetch(cartApiUrl);
  
      if (!response.ok) {
        // Handle the case where the API request was not successful
        throw new Error(`Failed to fetch cart data: ${response.statusText}`);
      }
  
      const cart = await response.json();
      const items = cart.items;
  
      return { props: { cart, items, userId } };
    } catch (e) {
      console.error(e);
      // Handle the error and still return an object with props
      return { props: { error: 'An error occurred' } };
    }
  }    

  const Cart = ({ cart, items, userId }) => {
    const [redirecting, setRedirecting] = useState(false);
    const { data: session } = useSession();
    const [cartDetails, setCartDetails] = useState(items);
  
    async function removeItem(userId, productId) {
      try {
        await fetch(`/api/deleteFromCart?userId=${userId}&productId=${productId}`, {
          method: "DELETE"
        });
  
        // If the item is successfully deleted from the backend, update cartDetails without the deleted product.
        setCartDetails((prevCartDetails) => {
          const updatedCart = prevCartDetails.filter((product) => product.productId !== productId);
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
                                    onClick={() => removeItem(userId, product.productId)}
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