import { NextPage } from "next";
import { FormEvent, useRef } from "react";
import classes from "./newsletter-registration.module.css";

export interface INewSletterRegistration {}

const NewsletterRegistration: NextPage<INewSletterRegistration> = () => {
  const emailInput = useRef<HTMLInputElement>();

  function registrationHandler(event: FormEvent) {
    event.preventDefault();
    const email = emailInput.current.value;

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
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
