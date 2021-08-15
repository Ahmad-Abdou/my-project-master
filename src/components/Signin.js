import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import NavbarCom from "./NavbarCom";
import "../styling/siginin.css";
import { Redirect } from "react-router-dom";
import emailjs from "emailjs-com";
import { NavLink } from "react-router-dom";
function Signin() {
  const [user, setUser] = useState({});
  const [signedIn, IsSignedIn] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const { myEmail, myPassword } = user;
  const [newData, setNewData] = useState({
    id: "",
    password: "",
    email: "",
    userName: "",
  });
  const { email, password, userName } = newData;
  const [isRegistered, setIsRegistered] = useState(false);
  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const changeHandlerRegistration = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/v1/users/register", newData)
      .then((res) => {
        if (res.status === 500) {
          return console.log("Email already exist");
        }
        setIsRegistered(true);
      })
      .catch((err) => console.log(err));
  };
  function sendEmail(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_m8a3el1",
        "template_8zeesp7",
        e.target,
        "user_syaJzmGxi5KA5yTJpzSLM"
      )
      .then(
        (result) => {},
        (error) => {
          console.log(error.text);
        }
      );
  }
  const callingboth = (e) => {
    sendEmail(e);
    submitHandler(e);
  };
  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/v1/signin", user)
      .then((res) => {
        if (res.status === 200) {
          IsSignedIn(true);
        }
      })
      .catch((err) => {
        setIsSubmited(true);
        console.log("Invalid email or password");
      });
  };

  const signOut = () => {
    axios
      .post("http://localhost:8080/api/v1/signout")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <NavbarCom setUser={() => signOut()}></NavbarCom>
      {signedIn && <Redirect to="/home"></Redirect>}

      <div className="signin-container">
        <Form className="signin-form" onSubmit={login}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={changeHandler}
              value={myEmail}
              name="email"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={changeHandler}
              value={myPassword}
              name="password"
              required
            />
          </Form.Group>

          {isSubmited && (
            <Alert className="my-alert" variant="danger">
              Invalid email or password
            </Alert>
          )}
          <Button variant="primary" type="submit">
            Log in
          </Button>
          <NavLink
            className="ml-5 "
            exact
            to="/emailvalid"
            activeClassName="activeClicked"
          >
            Forgot Password!
          </NavLink>
        </Form>
      </div>
      <div className="register-container">
        {isRegistered && (
          <Alert className="my-alert-register" variant="success">
            You have registered successfully
          </Alert>
        )}
        <Form className="register-form" onSubmit={callingboth}>
          <Form.Group className="mb-3">
            <Form.Label>UserName</Form.Label>
            <Form.Control
              type="text"
              placeholder="UserName"
              name="userName"
              value={userName}
              onChange={changeHandlerRegistration}
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
              onChange={changeHandlerRegistration}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              name="password"
              value={password}
              onChange={changeHandlerRegistration}
              required
            />
          </Form.Group>
          <Button className="register" variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
      {/* <Contact></Contact> */}
    </>
  );
}

export default Signin;
