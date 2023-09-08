import React from 'react';
import Logo from './Logo';
import LoginIcon from '@mui/icons-material/Login';
import { signOut, signIn, useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Image from 'next/image'

const Hero = () => {

  const { data: session, status } = useSession()

  const router = useRouter();

  // Function to handle booking click redirection
  const bookingClick = () => {
    const redirectTo = '/booking'; // Replace with the desired route
    router.push(redirectTo);
  };

  // Function to handle login click redirection
  const loginClick = () => {
    const redirectTo = '/api/auth/signin'; // Replace with the desired route
    router.push(redirectTo);
  };

  return (
  <div className="hero my-5 text-center">
    <h1 className="xl:text-8xl med:text-8xl sm:text-5xl xs:text-6xl xxs:text-5xl font-bold">Voidspace</h1>
    <p className="xl:text-4xl med:text-2xl sm:text-xl xs:text-lg xxs:text-md p-8 pb-4">Hourly studio rentals in East LA.</p>
    <div className="flex flex-col items-center">
    <Image alt="void the cat" src="/voidtransparent.png" width="200" height="200"></Image>
    <p className="italic xl:text-sm med:text-xs sm:text-xs xs:text-xs xxs:text-xs p-8 pb-4"></p>
    {status === 'authenticated' ? (
  <button
    onClick={bookingClick}
    className="bg-transparent hover:bg-gray-900 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded">
    Booking
  </button>
) : (
  <button
    type="button"
    title="Login"
    className="bg-transparent hover:bg-gray-900 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded"
    onClick={loginClick}>
    Login
  </button>
)}
  </div>
  </div>
);}

export default Hero;