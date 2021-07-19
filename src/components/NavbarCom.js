import React from "react";
import { Link } from "react-router-dom";
import "../styling/navbar.css";
import { FaOpencart, FaHeart } from "react-icons/fa";
import { MdMovie } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Navbar, Nav, FormControl } from "react-bootstrap";

function NavbarCom({ setInput, counter, wishCounter }) {
  return (
    <div className="mynav">
      <Navbar className="navbar" variant="dark">
        <Navbar.Brand>Movie-Shop</Navbar.Brand>
        <Navbar.Brand>
          <MdMovie></MdMovie>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link>
            <Link className="link" to="/">
              Home
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="link" to="/contact">
              Register
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="link" to="/dashboard">
              Dashboard
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="link" to="/cart">
              <FaOpencart className="cart-icon">
                <button type="button"></button>
              </FaOpencart>
              {counter > 0 && <li className="counter">{counter}</li>}
            </Link>
          </Nav.Link>
          <Nav.Link>
            <FaHeart className="wish-icon"> </FaHeart>
            {wishCounter > 0 && <li className="wishCounter">{wishCounter}</li>}
          </Nav.Link>
        </Nav>
        <Form inline>
          <FormControl
            onKeyDown={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Search"
            className="search"
          />
          <Button className="search-btn" variant="danger">
            <p className="search-text">Search</p>
          </Button>
        </Form>
      </Navbar>
    </div>
  );
}

export default NavbarCom;
