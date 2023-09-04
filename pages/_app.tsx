import { SessionProvider } from "next-auth/react"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import type { Session } from "next-auth"
import Layout from "../components/Layout"
import React from "react"
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@emotion/react"; 
import dotenv from 'dotenv';
import CssBaseline from '@mui/material/CssBaseline';

dotenv.config();

const theme = createTheme({
  palette: {
    primary: {
      light: '#37474f',
      main: 'rgb(17 24 39)',
      dark: '#37474f',
      contrastText: '#000',
    },
    secondary: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#ffffff',
      contrastText: '#FFF',
    },
    text:{
      primary: "#FFFFFF"
    },
    background: {
      default: 'rgb(31 41 55)',
      paper: 'rgb(75 85 99)',
    },
  },
});

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <Layout>
      <Component {...pageProps} />
      </Layout>
      </ThemeProvider>
    </SessionProvider>
  )
}
