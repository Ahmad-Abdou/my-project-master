import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import NavbarCom from "./NavbarCom";
import "../styling/siginin.css";
import Contact from "./Contact";
import { Redirect } from "react-router-dom";

function Signin() {
  const [user, setUser] = useState({});
  const [signedIn, IsSignedIn] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const { email, password } = user;

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
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
              value={email}
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
              value={password}
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
        </Form>
      </div>
      <Contact></Contact>
    </>
  );
}

export default Signin;
