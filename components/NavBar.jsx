import React, { useState } from 'react';
import Link from 'next/link';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { signOut, signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/router';

const NavBar = () => {
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const cartClick = () => {
    const redirectTo = '/cart'; // Replace with the desired route
    router.push(redirectTo);
  };

  return (
    <nav className="">
      <div className="flex items-center justify-between" id="navbar-default">
      {status === 'authenticated' && (
        <ul className="flex space-x-4 text-white justify-start">
          <li>
            <Link 
            href="/" 
            className="xxxs:hidden xxs:hidden xs:hidden sm:block py-2 pl-3 pr-4 rounded hover:bg-gray-500 md:hover:bg-transparent md:border-0 md:p-0 text-base" 
            aria-current="page">Home</Link>
          </li>
            <li>
              <Link href="/booking" 
              className="xxxs:hidden xxs:hidden xs:hidden sm:block py-2 pl-3 pr-4 rounded hover:bg-gray-500 md:hover:bg-transparent md:border-0 md:p-0 text-base">Booking</Link>
            </li>
            <li>
              <Link href="/about" 
              className="xxxs:hidden xxs:hidden xs:hidden sm:block py-2 pl-3 pr-4 rounded hover:bg-gray-500 md:hover:bg-transparent md:border-0 md:p-0 text-base">About</Link>
            </li>

          <li>
            <Link href="/contact" className="xxxs:hidden xxs:hidden xs:hidden sm:block py-2 pl-3 pr-4 rounded hover:bg-gray-500 md:hover:bg-transparent md:border-0 md:p-0 text-base">Contact</Link>
          </li>
        </ul >
                  )}
      {status === 'unauthenticated' && (
        <ul className="flex space-x-4 text-white justify-start">
          <li>
            <Link 
            href="/" 
            className="xxxs:hidden xxs:hidden xs:hidden sm:block py-2 pl-3 pr-4 rounded hover:bg-gray-500 md:hover:bg-transparent md:border-0 md:p-0 text-base" 
            aria-current="page">Home</Link>
          </li>
          <li>
              <Link href="/about" 
              className="xxxs:hidden xxs:hidden xs:hidden sm:block py-2 pl-3 pr-4 rounded hover:bg-gray-500 md:hover:bg-transparent md:border-0 md:p-0 text-base">About</Link>
            </li>
          <li>
            <Link href="/contact" className="xxxs:hidden xxs:hidden xs:hidden sm:block py-2 pl-3 pr-4 rounded hover:bg-gray-500 md:hover:bg-transparent md:border-0 md:p-0 text-base">Contact</Link>
          </li>
        </ul >
                  )}
          <div className="flex space-x-4 justify-end ml-auto">
            {/* Login/Cart buttons */}
            <div className="xxxs:flex xxs:flex xs:flex">
                <ShoppingCartIcon type="button" 
                className="hover:bg-gray-500 rounded"
                color="secondary"
                onClick={cartClick}
                title="Cart">Cart</ShoppingCartIcon>
              {status === 'unauthenticated' && (
              <LoginIcon
                type="button"
                className="hover:bg-gray-500 rounded"
                title="Login"
                color="secondary"
                onClick={() => signIn()}
              >
                Logout
              </LoginIcon>)}
              {status === 'authenticated' && (
              <LogoutIcon
                type="button"
                className="hover:bg-gray-500 rounded"
                title="Login"
                color="secondary"
                onClick={() => signOut()}
              >
                Login
              </LogoutIcon>)}
              </div>
          </div >
      </div >
    </nav >
  );
};

export default NavBar;
