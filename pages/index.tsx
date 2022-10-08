import type { NextPage } from "next";
import { FormEvent, useRef, useState } from "react";
import { Feedback } from "../types";

const Home: NextPage = () => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
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

  const loadFeedbackHandler = async () => {
    const response = await fetch("/api/feedback");
    const data = await response.json();
    console.log(data);
    setFeedback(data.feedback);
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
      <hr />
      <button onClick={loadFeedbackHandler}>Load feedback</button>
      <div>
        {feedback.map((feed) => (
          <p key={feed.id}>
            <span>{feed.email}</span>: {feed.feedback}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Home;
