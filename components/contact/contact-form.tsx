import { FC } from "react";

import classes from "./contact-form.module.css";

const ContactForm: FC = () => {
  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your email</label>
            <input type="email" name="email" id="email" />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your name</label>
            <input type="text" name="name" id="name" />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your message</label>
          <textarea id="message" rows={5} />
        </div>
        <div className={classes.action}>
          <button>Send message</button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
