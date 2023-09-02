import React from 'react';
import Head from 'next/head';
import NavBar from './NavBar';
import Footer from './Footer';
import Container from '@mui/material/Container';
import ButtonAppBar from './AppBar';
import { ThemeProvider } from '@mui/material/styles';




const Layout = ({ children }) => (
  <Container maxWidth="md" className="dark:bg-gray-900">
    <Head>
      <title>Voidspace</title>
    </Head>
    <ButtonAppBar position="static" className="dark:bg-gray-900"><NavBar className="dark:bg-gray-900" /></ButtonAppBar>
    <main id="app" className="md:container md:mx-auto dark:bg-gray-900" data-testid="layout">
      <div className="md:container md:mx-auto">{children}</div>
      <Footer />
    </main>
  </Container >
);

export default Layout;
