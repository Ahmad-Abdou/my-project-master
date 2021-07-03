import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import "../styling/cart.css";
import { AppContext } from "../context/CartContext";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";

function Cart() {
  const { myArray, setMyArray } = useContext(AppContext);
  const [show, isShowing] = useState(false);
  const [empty, isEmpty] = useState(true);

  let newId = Math.floor(Math.random() * 1000000000);

  const increase = (index) => {
    const newItems = [...myArray];
    newItems[index].quantity++;
    console.log();
    setMyArray(newItems);
  };
  const decrease = (index, id) => {
    const newItems = [...myArray];
    if (newItems[index].quantity <= 1) {
      const newArray = myArray.filter((item) => item.id !== id);
      setMyArray(newArray);
    } else {
      newItems[index].quantity--;
      setMyArray(newItems);
    }
  };

  const getPrice = myArray.reduce((previous, current) => {
    let singleItem = current.price * current.quantity;
    let sum = singleItem + previous;
    return sum;
  }, 0);

  return (
    <article className="container-cart">
      <Navbar></Navbar>
      <div className="My-Message-container">
        {show ? (
          <div className="My-Message-purchase">
            <MdVerifiedUser className="true-icon"></MdVerifiedUser>
            <h1>Thanks for purchasing </h1>
            <h4>Order : {newId}</h4>
          </div>
        ) : (
          <div className="table-container">
            {myArray.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Count</th>
                  </tr>
                </thead>

                {myArray.map((item, index) => {
                  const { id, title, price, image, quantity } = item;

                  return (
                    <tbody key={id}>
                      <tr>
                        <td>
                          <h6 className="cart-title">{title}</h6>
                          <img
                            src={`data:image/jpeg;base64,${image}`}
                            alt={title}
                          />
                        </td>
                        <td className="price">
                          {price}$ * {quantity}
                          <h4>
                            Sub-Total :{" "}
                            {Math.round(price * quantity * 100) / 100} $
                          </h4>
                        </td>
                        <td>
                          <FaPlusCircle
                            className="arrow-up"
                            onClick={() => increase(index)}
                          ></FaPlusCircle>
                          <h4 className="cart-counter">{quantity}</h4>
                          <FaMinusCircle
                            className="arrow-down"
                            onClick={() => decrease(index, id)}
                          ></FaMinusCircle>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
                <tbody>
                  <tr>
                    <td className="cart-total">
                      <p className="total">Total</p>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      {/* <p className="sum">{Math.round(getPrice * 100) / 100}$</p> */}
                    </td>
                    <td>
                      <button
                        className="proceed"
                        onClick={() => isShowing(!show)}
                      >
                        Proceed
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <div>
                {empty && (
                  <div className="empty-cart">
                    <h1>Your Cart Is empty!</h1>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default Cart;
