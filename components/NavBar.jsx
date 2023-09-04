import React, { useState } from 'react';
import Link from 'next/link';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { signOut, signIn, useSession } from "next-auth/react";


const NavBar = () => {
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="">
      <div className="inline-flex order-1" 
      id="navbar-default">
        <ul className="flex space-x-4 text-white pt-2">
          <li>
            <Link 
            href="/" 
            className="block py-2 pl-3 pr-4 rounded hover:bg-gray-400 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-base " 
            aria-current="page">Home</Link>
          </li>
          <>
            <li>
              <Link href="/booking" 
              className="block py-2 pl-3 pr-4 rounded hover:bg-gray-400 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-base ">Booking</Link>
            </li>
          </>
          <li>
            <Link href="/contact" className="block py-2 pl-3 pr-4 rounded hover:bg-gray-400 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-base">Contact</Link>
          </li>
          {/* <li>
            <Link href="/register" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-base ">Register</Link>
          </li> */}
        </ul >
        <div className="flex flex-wrap items-center justify-between md:mx-auto p-4 ">
        
        <div className="flex md:order-2 ">
          {/* Login/Logout/Profile buttons */}
            <Link href="/cart">
              <ShoppingCartIcon type="button" 
              className="block"
              color="secondary"
              title="Cart">Cart</ShoppingCartIcon>
            </Link>
            <LoginIcon
              type="button"
              className="block pt-1"
              title="Login"
              color="secondary"
              onClick={() => signIn()}
            >
              Login
            </LoginIcon>
          

        </div>
        </div >
      </div >
    </nav >
  );
};

export default NavBar;
