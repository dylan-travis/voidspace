import React from 'react';
import Logo from './Logo';
import LoginIcon from '@mui/icons-material/Login';
import { signOut, signIn, useSession } from "next-auth/react"
import { Button } from '@mui/material';

const Hero = () => {

  const { data: session, status } = useSession()

  
  return (
  <div className="hero my-5 text-center">
    <h1 className="text-8xl font-bold dark:text-white">Voidspace</h1>
    <p className="text-2xl p-8 dark:text-white">Hourly studio rentals in Los Angeles.</p>
    <div className="flex flex-col items-center">
    {status === 'authenticated' ? (
  <Button
    href="/booking"
    variant="contained"
    className="dark:bg-gray-700 dark:text-white"  >
    Booking
  </Button>


) : (
  <Button
    variant="contained"
    color="primary"
    type="button"
    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent justify-end dark:bg-gray-700"
    title="Login"
    onClick={() => signIn()}
  >
    Login
  </Button>
)}
  </div>
  </div>
);}

export default Hero;
