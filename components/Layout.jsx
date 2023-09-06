import React from 'react';
import Head from 'next/head';
import NavBar from './NavBar';
import Footer from './Footer';
import Container from '@mui/material/Container';
import ButtonAppBar from './AppBar';
import { ThemeProvider } from '@mui/material/styles';




const Layout = ({ children }) => (
  <Container maxWidth="md" className="">
    <Head>
      <title>Voidspace</title>
      <meta property="og:title" content="Voidspace" />
      <meta property="og:description" content="Hourly studio bookings in Los Angeles" />
      <meta property="og:image" content="" />
      <meta property="og:url" content="http://voidspace.vercel.app" />
      <meta property="og:type" content="website" />

    </Head>
    <ButtonAppBar position="static" className=""><NavBar className="" /></ButtonAppBar>
    <main id="app" className="md:container md:mx-auto" data-testid="layout">
      <div className="md:container md:mx-auto">{children}</div>
      <Footer />
    </main>
  </Container >
);

export default Layout;
