import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
import { useRouter } from 'next/router';


let cartDetails = null;
    
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
      let items = null;
      if(cart.items){items = cart.items;} else {cartDetails = {};}
  
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
  
    async function removeItem(userId, key) {
      try {
        await fetch(`/api/deleteFromCart?userId=${userId}&key=${key}`, {
          method: "DELETE"
        });
  
        // If the item is successfully deleted from the backend, update cartDetails without the deleted product.
        setCartDetails((prevCartDetails) => {
          const updatedCart = prevCartDetails.filter((product) => product.key !== key);
          return updatedCart;
        });
      } catch (error) {
        console.error(error);
      }
    }

    const router = useRouter();

    // Function to handle booking click redirection
    const bookingClick = () => {
      const redirectTo = '/booking'; // Replace with the desired route
      router.push(redirectTo);
    };
  

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
        <div>
            {cartDetails && Object.keys(cartDetails).length != 0 && (
                    <>
                        <h2 className="text-4xl font-semibold text-center pt-8">Your shopping cart</h2>
                    </>)}
                {/* Product Banner */}
                <div className="mt-12">
                    {cartDetails && Object.entries(cartDetails).map(([key, product]) => (
                        <div
                            key={key}
                            className="xxs:text-sm flex justify-between space-x-4 hover:shadow-lg hover:border-opacity-50 border border-opacity-0 rounded-md p-4"
                        >
                            {/* Image + Name */}

                            <a className="flex items-center space-x-4 group">
                                <div className="relative w-15 group-hover:scale-110 transition-transform xxs:hidden xs:hidden med:block">
                                    <Image
                                        src="/blacksquare.jpg"
                                        alt={product.productName}
                                        className="rounded-md"
                                        width={80}
                                        height={80}
                                    />
                                </div>
                                <p className="font-semibold med:text-xl xxs:text-sm group-hover:underline ">
                                    {product.productName}
                                </p>
                                <p className="text-gray-500 italic med:text-lg xxs:text-xs">{format(parseISO(product.bookingDate), 'dd MMMM, yyyy')}, <span className="font-semibold">{formatHoursTo12HourClock(product.bookingHour)} - {formatHoursTo12HourClock(product.endBookingHour)}</span></p>

                            </a>
                            {/* Quantity */}
                            <div className="flex items-center space-x-3 ">
                                {/* Price */}
                                <p className="font-semibold text-xl ml-16 xxs:ml-0">

                                    ${(product.productPrice)}
                                </p>

                                {/* Remove item */}
                                <button
                                    onClick={() => removeItem(userId, product.key)}
                                    className="ml-4 hover:text-rose-500"
                                >
                                    <DeleteIcon className="w-6 h-6 flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Checkout and Clear Buttons */}
                     {cartDetails && Object.keys(cartDetails).length != 0 && (
                    <div className="pt-8 text-center">
                        <button
                            className="bg-transparent hover:bg-gray-900 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded"
                            onClick={redirectToCheckout}
                        >
                            Checkout
                        </button>
                        <button
                          className="bg-transparent hover:bg-gray-900 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded"

                        >
                            Clear all
                        </button>
                    </div>)}
                    {cartDetails.length == 0 && (
                    <div className="justify-center text-center">
                        <h2 className="med:text-4xl font-semibold pb-8 xxs:text-xl">
                            Your shopping cart is empty.
                        </h2>
                        <p className="mt-1 med:text-xl pb-12 xxs:text-lg xs:text-lg">
                            Please head to our booking page to add to cart.{' '}
                        </p>
                            <button
                              onClick={bookingClick}
                              className="justify-center bg-transparent hover:bg-gray-900 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded">
                              Booking
                            </button>
                    </div>)}
                
            </div>
        );
};     
        


export default Cart;