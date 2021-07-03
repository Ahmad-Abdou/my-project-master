import React from "react";
import { Link } from "react-router-dom";
import "../styling/navbar.css";
import { FaOpencart, FaHeart } from "react-icons/fa";
import { MdMovie } from "react-icons/md";

function Navbar({ setInput, counter, wishCounter, addingItem }) {
  return (
    <nav className="nav">
      <MdMovie className="page-icon"></MdMovie>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li className="page-title">Movie-Shop</li>
        <li>
          <input
            type="text"
            className="search"
            placeholder="Search"
            onKeyDown={(e) => setInput(e.target.value)}
          />
        </li>
        <div className="cart">
          <li>
            <FaOpencart className="cart-icon">
              <button type="button"></button>
            </FaOpencart>
            <Link to="/cart">
              <span className="cart-text">Cart</span>
            </Link>
          </li>
        </div>
        <li>
          <FaHeart className="wish-icon"> </FaHeart>
        </li>
        {counter > 0 && <li className="counter">{counter}</li>}
        {wishCounter > 0 && <li className="wish-counter">{wishCounter}</li>}
      </ul>
    </nav>
  );
}

export default Navbar;
