import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import axios from 'axios';
import getStripe from './get-stripe';
import DeleteIcon from '@mui/icons-material/Delete';

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
    },
    'price_1NQcKfK1A3hq7BalfjArBhHd': {
        id: 'price_1NQcKfK1A3hq7BalfjArBhHd',
        name: 'One Hour',
        description: 'One hour booking',
        image: 'https://i1.wp.com/cornellsun.com/wp-content/uploads/2020/06/1591119073-screen_shot_2020-06-02_at_10.30.13_am.png',
        currency: 'USD',
        price: 30,
        formattedValue: '$30.00',
        value: 1000,
        quantity: 1,
        totalPrice: "30.00",
        selectedHourBegin: "12:00",
        selectedHourEnd: "13:00",
        day: "2023-10-10"
    },
    'price_1NQcL6K1A3hq7BalmelNWvQz': {
        id: 'price_1NQcL6K1A3hq7BalmelNWvQz',
        name: 'Four Hours',
        description: 'Four hour booking',
        image: 'https://i1.wp.com/cornellsun.com/wp-content/uploads/2020/06/1591119073-screen_shot_2020-06-02_at_10.30.13_am.png',
        currency: 'USD',
        price: 110,
        formattedValue: '$110.00',
        value: 1000,
        quantity: 1,
        totalPrice: "110.00",
        selectedHourBegin: "14:00",
        selectedHourEnd: "18:00",
        day: "2023-10-10"
    }
}

// const cartDetails = {}

const Cart = () => {
    const [redirecting, setRedirecting] = useState(false);

    const redirectToCheckout = async () => {
        // Create Stripe checkout
        const {
            data: { id },
        } = await axios.post('/api/checkout_sessions', {
            items: Object.entries(cartDetails).map(([_, { id, quantity }]) => ({
                price: id,
                quantity,
            })),
        });

        // Redirect to checkout
        const stripe = await getStripe();
        await stripe.redirectToCheckout({ sessionId: id });

        console.log(cartDetails.length)

    };


    return (
        <>
            <Head>
                <title>My Shopping Cart | Figueroa Studios</title>
            </Head>
            {/* Main Div */}
            <div className="container xl:max-w-screen-xl mx-auto py-12 px-6">
                {/* Checkout and Clear Buttons */}
                {Object.keys(cartDetails).length != 0 && (
                    <>
                        <h2 className="text-4xl font-semibold pb-8">Your shopping cart</h2>
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Clear all
                        </button>
                        <button
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={redirectToCheckout}
                        >
                            Checkout
                        </button>
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