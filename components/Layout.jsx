import React from 'react';
import Head from 'next/head';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Fig Studios</title>
    </Head>
    <main id="app" className="md:container md:mx-auto" data-testid="layout">
    <NavBar />
      <div className="md:container md:mx-auto">{children}</div>
    <Footer />
    </main>
  </>
);

export default Layout;
