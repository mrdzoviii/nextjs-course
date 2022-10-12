import { NextPage } from "next";
import { FormEvent, useContext, useRef } from "react";
import NotificationContext from "../../store/notification-context";
import classes from "./newsletter-registration.module.css";

export interface INewSletterRegistration {}

const NewsletterRegistration: NextPage<INewSletterRegistration> = () => {
  const emailInput = useRef<HTMLInputElement>();

  const { showNotification } = useContext(NotificationContext);

  function registrationHandler(event: FormEvent) {
    event.preventDefault();
    const email = emailInput.current.value;

    showNotification({
      message: "Registering for newsletter",
      title: "Signing up...",
      status: "pending",
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((data) => {
          throw new Error(data.message || "Something went wrong");
        });
      })
      .then(() =>
        showNotification({
          title: "Success",
          message: "Successfully registered for newsletter",
          status: "success",
        })
      )
      .catch((err) =>
        showNotification({
          title: "Error!",
          message: err.message || "Something went wrong",
          status: "error",
        })
      );
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailInput}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
};

export default NewsletterRegistration;
