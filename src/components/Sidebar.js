import React, { useState, useEffect } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import {
  BiMovie,
  BiColumns,
  BiUser,
  BiListUl,
  BiCart,
  BiCaretRightSquare,
  BiBorderOuter,
} from "react-icons/bi";
import { FaSignInAlt } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";
import axios from "axios";
import { Modal } from "react-bootstrap";
import "../styling/Sidebar.css";
const Sidebar = () => {
  const [signedUser, setSignedUser] = useState("");
  const [signiedMessage, setSignedMessage] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/myuser")
      .then((res) => {
        setSignedUser(res.data);
      })
      .catch((err) => {
        setSignedMessage(true);
        console.log("No user Sigen in");
      });
  }, []);

  return (
    <div
      style={{
        display: "inline-block",
        height: "100vh",
        overflow: "scroll initial",
        position: "fixed",
      }}
    >
      <Modal
        show={signiedMessage}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header>
          <Modal.Title>
            <p className="sign-in-message">Please Sign in first</p> <br />
            <a className="sign-in-url" href="/signin">
              Go to sign in
            </a>
          </Modal.Title>
        </Modal.Header>
      </Modal>
      {signedUser === "USER" ? (
        <CDBSidebar textColor="#fff" backgroundColor="#333">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              Movie shop
            </a>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to="/home" activeClassName="activeClicked">
                <CDBSidebarMenuItem>
                  <BiCaretRightSquare className="mr-4 fa-2x"></BiCaretRightSquare>
                  Movie shop
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/cart" activeClassName="activeClicked">
                <CDBSidebarMenuItem>
                  <BiCart className="mr-4 fa-2x"></BiCart>Cart
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/movies" activeClassName="activeClicked">
                <CDBSidebarMenuItem>
                  <BiMovie className="mr-4 fa-2x"></BiMovie>Movies
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/myprofile" activeClassName="activeClicked">
                <CDBSidebarMenuItem>
                  <BiUser className="mr-4 fa-2x"></BiUser>My profile
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/categories" activeClassName="activeClicked">
                <CDBSidebarMenuItem>
                  <BiListUl className="mr-4 fa-2x"></BiListUl>
                  Categories
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/contact" activeClassName="activeClicked">
                <CDBSidebarMenuItem>
                  <IoIosContact className="mr-4 fa-2x"></IoIosContact>
                  Contact
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/order" activeClassName="activeClicked">
                <CDBSidebarMenuItem>
                  <BiBorderOuter className="mr-4 fa-2x"></BiBorderOuter>Orders
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/users" activeClassName="activeClicked">
                <CDBSidebarMenuItem>
                  <BiUser className="mr-4 fa-2x"></BiUser>Users
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/signin" activeClassName="activeClicked">
                <CDBSidebarMenuItem>
                  <FaSignInAlt className="mr-4 fa-2x"></FaSignInAlt>
                  Sign in
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
      ) : (
        <CDBSidebar textColor="#fff" backgroundColor="#333">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              Movie shop
            </a>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to="/home" activeClassName="activeClicked">
                <CDBSidebarMenuItem>
                  <BiCaretRightSquare className="mr-4 fa-2x"></BiCaretRightSquare>
                  Movie shop
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/dashboard" activeClassName="activeClicked">
                <CDBSidebarMenuItem>
                  <BiColumns className="mr-4 fa-2x"></BiColumns>Dashboard
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/cart" activeClassName="activeClicked">
                <CDBSidebarMenuItem>
                  <BiCart className="mr-4 fa-2x"></BiCart>Cart
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/order" activeClassName="activeClicked">
                <CDBSidebarMenuItem>
                  <BiBorderOuter className="mr-4 fa-2x"></BiBorderOuter>Orders
                </CDBSidebarMenuItem>
              </NavLink>

              <NavLink exact to="/movies" activeClassName="activeClicked">
                <CDBSidebarMenuItem>
                  <BiMovie className="mr-4 fa-2x"></BiMovie>Movies
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/users" activeClassName="activeClicked">
                <CDBSidebarMenuItem>
                  <BiUser className="mr-4 fa-2x"></BiUser>Users
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/categories" activeClassName="activeClicked">
                <CDBSidebarMenuItem>
                  <BiListUl className="mr-4 fa-2x"></BiListUl>
                  Categories
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/contact" activeClassName="activeClicked">
                <CDBSidebarMenuItem>
                  <IoIosContact className="mr-4 fa-2x"></IoIosContact>
                  Contact
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/signin" activeClassName="activeClicked">
                <CDBSidebarMenuItem>
                  <FaSignInAlt className="mr-4 fa-2x"></FaSignInAlt>
                  Sign in
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
      )}
    </div>
  );
};

export default Sidebar;
