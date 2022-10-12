import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/layout";
import Head from "next/head";
import Notification from "../components/ui/notification";
import { NotificationContextProvider } from "../store/notification-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <meta
            name="viewport"
            content="inital-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
        <Notification status="error" />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
