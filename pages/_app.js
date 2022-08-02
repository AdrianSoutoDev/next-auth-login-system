import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css'
import Head from "next/head"
import { SessionProvider } from "next-auth/react"


function MyApp({ session, Component, pageProps }) {

  return (
    <SessionProvider session={session}> 
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp
