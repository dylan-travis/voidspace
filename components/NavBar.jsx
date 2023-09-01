import React, { useState } from 'react';
import Link from 'next/link';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { signOut, signIn, useSession } from "next-auth/react"


const NavBar = () => {
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">

      <div className="flex flex-wrap items-center justify-between md:mx-auto p-4">
        <div className="flex md:order-2">
          {/* Login/Logout/Profile buttons */}
          {status === 'authenticated' && (
            <>
          <Link href="/profile"><AccountBoxIcon href="/profile" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent justify-end"></AccountBoxIcon></Link>
          <Link href="/cart"><ShoppingCartIcon type="link" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent justify-end" title="Cart">Cart</ShoppingCartIcon></Link>
          </>)}
          {status === 'unauthenticated' && (
            <LoginIcon
              type="button"
              className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent justify-end"
              title="Login"
              onClick={() => signIn()}
            >
              Login
            </LoginIcon>
          )}
          {status === 'authenticated' && (
            <LogoutIcon
              type="button"
              className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent justify-end"
              title="Logout"
              onClick={() => signOut()}>Logout</LogoutIcon>)}

        </div>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link href="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500 text-base" aria-current="page">Home</Link>
            </li>
            <>
              <li>
                <Link href="/booking" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-base">Booking</Link>
              </li>
            </>
            <li>
              <Link href="/contact" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-base">Contact</Link>
            </li>
            <li>
              <Link href="/register" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-base">Register</Link>
            </li>
          </ul >
        </div >
      </div >
    </nav >
  );
};

export default NavBar;
