import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

import "../styling/siginin.css";
import emailjs from "emailjs-com";
function EmailValidation() {
  const [thisEmail, setThisEmail] = useState("");
  const onChangeHandler = (e) => {
    setThisEmail((e.target.thisEmail = e.target.value));
  };
  console.log(thisEmail);
  function sendEmail(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_gxeje4r",
        "template_rv5qiwp",
        e.target,
        "user_syaJzmGxi5KA5yTJpzSLM"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  return (
    <Form className="signin-form" onSubmit={(e) => sendEmail(e)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={onChangeHandler}
          value={thisEmail}
          name="thisEmail"
        />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default EmailValidation;
