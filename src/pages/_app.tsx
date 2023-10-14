import "../styles/globals.css";

import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
//import classNames from "classnames";

import store from "../app/store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Head from "next/head";
//import { useAppSelector } from "../app/hooks";
//import { useAppDispatch } from "../app/hooks";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode,
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout,
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  
  const getLayout = Component.getLayout || ((page) => page);
  const Layout = () => (
    <div>
      {
        getLayout(<Component {...pageProps} />)
      }
    </div>
  );
  
  return (
    <Provider store={store}>
      <PayPalScriptProvider options={{"client-id": "test"}}>
        <div>
          <Head>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Layout></Layout>
          {/* <Component {...pageProps} /> */}
        </div>
      </PayPalScriptProvider>
      {/* <Layout></Layout> */}
      {/* {
        getLayout(<Component {...pageProps} />)
      } */}
    </Provider>
  )
}
