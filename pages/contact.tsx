import { NextPage } from "next";
import Head from "next/head";

import ContactForm from "../components/contact/contact-form";

const ContactPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contact me</title>
        <meta name="description" content="Send me your messages" />
      </Head>
      <ContactForm />
    </>
  );
};

export default ContactPage;
