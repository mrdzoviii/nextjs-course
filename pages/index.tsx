import type { NextPage } from "next";
import { EventHandler, FormEvent, FormEventHandler, useRef } from "react";

const Home: NextPage = () => {
  const emailRef = useRef<HTMLInputElement>();
  const feedbackRef = useRef<HTMLTextAreaElement>();

  const submitFormHandler = async (event: FormEvent) => {
    event.preventDefault();
    const emailValue = emailRef.current.value;
    const feedbackValue = feedbackRef.current.value;
    const response = await fetch(`/api/feedback`, {
      method: "POST",
      body: JSON.stringify({ email: emailValue, feedback: feedbackValue }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const message = await response.json();
    console.log(message);
  };

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input ref={emailRef} type="email" id="email" />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea ref={feedbackRef} rows={5} id="feedback" />
        </div>
        <button>Send feedback</button>
      </form>
    </div>
  );
};

export default Home;
