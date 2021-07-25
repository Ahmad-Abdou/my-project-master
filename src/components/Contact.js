import React, { useState } from "react";
import "../styling/contact.css";
import axios from "axios";
// import emailjs from "emailjs-com";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Alert } from "react-bootstrap";

function Contact(user) {
  const [newData, setNewData] = useState({
    id: "",
    password: "",
    email: "",
    userName: "",
  });
  const [confirm, setConfirmation] = useState("");
  const { email, password, userName } = newData;
  const [isSubmited, setIsSubmited] = useState(false);
  const changeHandler = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/v1/register", newData)
      .then((res) => {
        if (res.status === 500) {
          return console.log("Email already exist");
        }
        setConfirmation(res.data);
        setIsSubmited(true);
      })
      .catch((err) => console.log(err));
  };
  // function sendEmail(e) {
  //   e.preventDefault();
  //   emailjs
  //     .sendForm(
  //       "service_gxeje4r",
  //       "template_rv5qiwp",
  //       e.target,
  //       "user_syaJzmGxi5KA5yTJpzSLM"
  //     )
  //     .then(
  //       (result) => {
  //         console.log(result.text);
  //       },
  //       (error) => {
  //         console.log(error.text);
  //       }
  //     );
  // }
  const callingboth = (e) => {
    // sendEmail(e);
    submitHandler(e);
  };

  // const confirmUser = () => {
  //   axios
  //     .get(`http://localhost:8080/api/v1/confirm?token=${confirm}`)
  //     .then((res) => {});
  // };

  return (
    <div className="register-container">
      {isSubmited && (
        <Alert className="my-alert-contact" variant="success">
          You have registered successfully
        </Alert>
      )}
      <Form className="contact" onSubmit={callingboth}>
        <Form.Group className="mb-3">
          <Form.Label>UserName</Form.Label>
          <Form.Control
            type="text"
            placeholder="UserName"
            name="userName"
            value={userName}
            onChange={changeHandler}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={changeHandler}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={changeHandler}
            required
          />
        </Form.Group>
        <Button className="register" variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Contact;
