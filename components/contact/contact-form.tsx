import { FC, FormEvent, useState } from "react";

import classes from "./contact-form.module.css";

const ContactForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, message }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form onSubmit={onSubmitHandler} className={classes.form}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your email</label>
            <input
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              type="email"
              name="email"
              id="email"
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your name</label>
            <input
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              type="text"
              name="name"
              id="name"
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your message</label>
          <textarea
            value={message}
            onChange={(ev) => setMessage(ev.target.value)}
            id="message"
            rows={5}
          />
        </div>
        <div className={classes.action}>
          <button>Send message</button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
