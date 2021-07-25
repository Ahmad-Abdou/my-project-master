import React, { useEffect } from "react";
import "../styling/navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { BiLogOutCircle } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import axios from "axios";
function NavbarCom({ setUser }) {
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
    <Navbar onClick={signOut} className="fixed-top" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Movie Shop</Navbar.Brand>
        <Nav className="me-auto">
          <NavLink exact to="/signin" activeClassName="activeClicked">
            <BiLogOutCircle className="mr-4 fa-2x"></BiLogOutCircle>
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarCom;
