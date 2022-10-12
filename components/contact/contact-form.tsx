import { FC, FormEvent, useEffect, useState } from "react";

import { IContactFormRequest } from "../../type-definitions";
import Notification, { INotificationProps } from "../ui/notification";

import classes from "./contact-form.module.css";

const sendContactData = async ({
  email,
  name,
  message,
}: IContactFormRequest) => {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, name, message }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
};

const ContactForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [requestStatus, setRequestStatus] = useState<string>();
  const [requestError, setRequestError] = useState<string>();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 300000);
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    setRequestStatus("pending");
    try {
      await sendContactData({ email, name, message });
      setRequestStatus("success");
    } catch (err) {
      setRequestStatus("error");
      setRequestError(err.message);
    }
  };

  let notification: INotificationProps;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on the way!",
    };
  }
  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success",
      message: "Message send successfully",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: requestError,
    };
  }

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
      {notification && <Notification {...notification} />}
    </section>
  );
};

export default ContactForm;
