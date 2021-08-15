import React, { useState } from "react";
import "../styling/contact.css";
import axios from "axios";
import emailjs from "emailjs-com";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Alert } from "react-bootstrap";
import Sidebar from "./Sidebar";
import NavbarCom from "./NavbarCom";
import Robot from "./Robot";
function Contact(user) {
  const [newData, setNewData] = useState({
    id: "",
    email: "",
    firstName: "",
    comments: "",
    orderNumber: "",
    lastName: "",
    phoneNumber: "",
  });
  // eslint-disable-next-line
  const [confirm, setConfirmation] = useState("");
  const { email, firstName, orderNumber, comments, lastName, phoneNumber } =
    newData;
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
  const callingboth = (e) => {
    sendEmail(e);
    submitHandler(e);
  };

  return (
    <>
      <NavbarCom></NavbarCom>
      <Sidebar></Sidebar>
      <Robot></Robot>
      <div className="contact-container">
        {isSubmited && (
          <Alert className="my-alert-contact" variant="success">
            You have registered successfully
          </Alert>
        )}
        <Form className="contact" onSubmit={callingboth}>
          <Form.Group className="mb-3">
            <Form.Label>Subject *</Form.Label>
            <br />
            <select className="select-option">
              <option value="0">Problem with Register/sign-in</option>
              <option value="1">Problem with payment</option>
              <option value="2">Refund</option>
              <option value="3">Cancel subscribtion</option>
              <option value="4">Shipping option</option>
              <option value="0">Coupon issues</option>
            </select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address *</Form.Label>
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
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First name"
              name="firstName"
              value={firstName}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="form-field" controlId="formBasicPassword">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last name"
              name="lastName"
              value={lastName}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="form-field" controlId="formBasicPassword">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type="text"
              placeholder="phone number"
              name="phoneNumber"
              value={phoneNumber}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="form-field" controlId="formBasicPassword">
            <Form.Label>Order number *</Form.Label>
            <Form.Control
              type="text"
              placeholder="order number"
              name="orderNumber"
              value={orderNumber}
              onChange={changeHandler}
              required
            />
          </Form.Group>
          <Form.Group className="form-field" controlId="formBasicPassword">
            <Form.Label className="text-area-comment">Comments *</Form.Label>
            <textarea
              className="text-area "
              type="text"
              placeholder="Please enter your question, reason or concern."
              name="comments"
              value={comments}
              onChange={changeHandler}
              required
            />
          </Form.Group>

          <Button className="submit-form " type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Contact;
