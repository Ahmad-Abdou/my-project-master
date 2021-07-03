import React, { useEffect, useState } from "react";
import "../styling/contact.css";
import Navbar from "./Navbar";
import axios from "axios";

function Contact() {
  const [newData, setNewData] = useState({
    id: "",
    password: "",
    email: "",
    username: "",
  });

  const { email, password, userName } = newData;

  const changeHandler = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
    console.log(newData);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://movieshop-env.eba-y5zzn5ds.us-east-2.elasticbeanstalk.com/api/v1/register",
        newData
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    console.log(newData);
  };
  return (
    <div className="whole-page">
      <Navbar></Navbar>
      <div className="contact-container">
        <form classNam="form" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="UserName"
            name="userName"
            value={userName}
            onChange={changeHandler}
          ></input>
          <br />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={changeHandler}
          ></input>
          <br />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={changeHandler}
          ></input>
          <br />
          <button type="submit" className="btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
