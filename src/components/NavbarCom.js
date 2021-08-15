import React, { useState, useEffect } from "react";
import "../styling/navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { BiLogOutCircle } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import axios from "axios";
function NavbarCom() {
  const [profileName, setProfileName] = useState("");
  const [profileLastName, setProfileLastName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const signOut = () => {
    axios
      .post("http://localhost:8080/api/v1/signout")
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/user")
      .then((res) => {
        setProfileName(res.data.userName);
        setProfileImage(res.data.image);
        setProfileLastName(res.data.lastName);
      })
      .catch((err) => {
        console.log("No user Sigen in");
      });
  }, []);

  return (
    <>
      {profileImage === null ? (
        <Navbar className="fixed-top" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Movie Shop</Navbar.Brand>
            <Nav className="me-auto">
              <NavLink exact to="/signin" activeClassName="activeClicked">
                <BiLogOutCircle
                  onClick={signOut}
                  className="mr-4 fa-2x"
                ></BiLogOutCircle>
              </NavLink>
              <NavLink
                to="/myprofile"
                activeClassName="activeClicked"
                className="profile-name"
              >
                {profileName} {profileLastName}
              </NavLink>
            </Nav>
          </Container>
        </Navbar>
      ) : (
        <Navbar className="fixed-top" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Movie Shop</Navbar.Brand>
            <Nav className="me-auto">
              <NavLink exact to="/signin" activeClassName="activeClicked">
                <BiLogOutCircle
                  onClick={signOut}
                  className="mr-4 fa-2x"
                ></BiLogOutCircle>
              </NavLink>
              <NavLink
                to="/myprofile"
                activeClassName="activeClicked"
                className="profile-name"
              >
                {profileName} {profileLastName}
              </NavLink>
              <NavLink to="/myprofile">
                <div>
                  <img
                    className="profile-image"
                    src={`data:image/jpeg;base64,${profileImage}`}
                    alt={profileName}
                  />
                </div>
              </NavLink>
            </Nav>
          </Container>
        </Navbar>
      )}
    </>
  );
}

export default NavbarCom;
