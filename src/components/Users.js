import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import "../styling/users.css";
import Sidebar from "./Sidebar";
import NavbarCom from "./NavbarCom";
function Users() {
  // eslint-disable-next-line
  const [userCounter, setUserCounter] = useState(0);
  const [userInfo, setUserInfo] = useState([]);

  const fetchUserProfile = () => {
    axios.get("http://localhost:8080/api/v1/users").then((res) => {
      setUserCounter(res.data.length);
      setUserInfo(res.data);
    });
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);
  return (
    <>
      <NavbarCom></NavbarCom>
      <Sidebar />
      <Container className="user_container">
        <Row>
          <Col>
            <h2 className="user-col">Users</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            {userInfo.map((user) => {
              const { id, userName } = user;

              return (
                <div key={id}>
                  <h5 className="user_info">{userName}</h5>
                </div>
              );
            })}
          </Col>
          <Col>
            {userInfo.map((user) => {
              const { id, email } = user;
              return (
                <div key={id}>
                  <h5 className="user_info">{email}</h5>
                </div>
              );
            })}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Users;
