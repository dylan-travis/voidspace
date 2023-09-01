import React from 'react';
import Head from 'next/head';
import NavBar from './NavBar';
import Footer from './Footer';
import Container from '@mui/material/Container';
import ButtonAppBar from './AppBar';
import { ThemeProvider } from '@mui/material/styles';




const Layout = ({ children }) => (
  <Container maxWidth="md">
    <Head>
      <title>Voidspace</title>
    </Head>
    <ButtonAppBar position="static"><NavBar /></ButtonAppBar>
    <main id="app" className="md:container md:mx-auto" data-testid="layout">
      <div className="md:container md:mx-auto">{children}</div>
      <Footer />
    </main>
  </Container >
);

export default Layout;
