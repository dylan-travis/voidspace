import React from 'react';
import Logo from './Logo';
import LoginIcon from '@mui/icons-material/Login';
import { signOut, signIn, useSession } from "next-auth/react"
import { Button } from '@mui/material';

const Hero = () => {

  const { data: session, status } = useSession()

  
  return (
  <div className="hero my-5 text-center">
    <h1 className="xl:text-8xl med:text-8xl sm:text-5xl xs:text-4xl xxs:text-3xl font-bold dark:text-white">Voidspace</h1>
    <p className="xl:text-4xl med:text-2xl sm:text-xl xs:text-lg xxs:text-md p-8 dark:text-white">Hourly studio rentals in Los Angeles.</p>
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
    className="dark:bg-gray-700 dark:text-white"
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
