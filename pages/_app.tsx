import { SessionProvider } from "next-auth/react"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import type { Session } from "next-auth"
import Layout from "../components/Layout"
import React from "react"
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@emotion/react"; 
import dotenv from 'dotenv';

dotenv.config();

const theme = createTheme({
  palette: {
    primary: {
      light: '#FFF',
      main: '#FFF',
      dark: '#FFF',
      contrastText: '#000',
    },
    secondary: {
      light: '#000',
      main: '#000',
      dark: '#000',
    }
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
      <Layout>
      <Component {...pageProps} />
      </Layout>
      </ThemeProvider>
    </SessionProvider>
  )
}
