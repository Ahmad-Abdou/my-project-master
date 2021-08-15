import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Alert } from "react-bootstrap";

function ResetPassword() {
  const [user, setMyUser] = useState({ email: "", password: "" });
  const { email, password } = user;
  const [changed, isChanged] = useState(false);

  const onChangeHandler = (e) => {
    setMyUser({ ...user, [e.target.name]: e.target.value });
  };
  console.log(user);
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/v1/password", user)
      .then((res) => {
        console.log(res.data);
        isChanged(true);
        setTimeout(() => {
          isChanged(false);
        }, 6000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {changed && (
        <Alert className="my-alert-register" variant="success">
          Password has been changed
        </Alert>
      )}

      <Form className="signin-form" onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={onChangeHandler}
            value={email}
            name="email"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={onChangeHandler}
            value={password}
            name="password"
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
}

export default ResetPassword;
