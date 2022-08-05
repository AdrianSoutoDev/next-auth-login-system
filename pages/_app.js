import SSRProvider from 'react-bootstrap/SSRProvider';
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css';
import Head from "next/head"
import { SessionProvider } from "next-auth/react"


function MyApp({ session, Component, pageProps }) {

  return (
    <SessionProvider session={session}> 
      <SSRProvider>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>
          <Component {...pageProps} />
      </SSRProvider>
    </SessionProvider>
  );
}

export default MyApp
