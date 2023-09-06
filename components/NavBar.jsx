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
      <div className="flex items-center justify-between" id="navbar-default">
        <ul className="flex space-x-4 text-white justify-start">
          <li>
            <Link 
            href="/" 
            className="xxxs:hidden xxs:hidden xs:hidden sm:block py-2 pl-3 pr-4 rounded hover:bg-gray-500 md:hover:bg-transparent md:border-0 md:p-0 text-base" 
            aria-current="page">Home</Link>
          </li>
          <>
            <li>
              <Link href="/booking" 
              className="xxxs:hidden xxs:hidden xs:hidden sm:block py-2 pl-3 pr-4 rounded hover:bg-gray-500 md:hover:bg-transparent md:border-0 md:p-0 text-base">Booking</Link>
            </li>
          </>
          <li>
            <Link href="/contact" className="xxxs:hidden xxs:hidden xs:hidden sm:block py-2 pl-3 pr-4 rounded hover:bg-gray-500 md:hover:bg-transparent md:border-0 md:p-0 text-base">Contact</Link>
          </li>
        </ul >
          <div className="flex space-x-4 justify-end ml-auto">
            {/* Login/Cart buttons */}
            <div className="xxxs:flex xxs:flex xs:flex">
              <Link href="/cart">
                <ShoppingCartIcon type="button" 
                className=""
                color="secondary"
                title="Cart">Cart</ShoppingCartIcon>
              </Link>
              {status === 'unauthenticated' && (
              <LoginIcon
                type="button"
                className=""
                title="Login"
                color="secondary"
                onClick={() => signIn()}
              >
                Logout
              </LoginIcon>)}
              {status === 'authenticated' && (
              <LogoutIcon
                type="button"
                className=""
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
