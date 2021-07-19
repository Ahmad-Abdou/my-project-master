import React, { useContext, useState } from "react";
import "../styling/cart.css";
import { AppContext } from "../context/CartContext";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import Sidebar from "./Sidebar";
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

  const getprice = myArray.reduce((previous, current) => {
    let singleItem = current.price * current.quantity;
    let sum = singleItem + previous;
    return sum;
  }, 0);

  return (
    <>
      <Sidebar />
      <article>
        <div>
          {show ? (
            <div className="empty-purchase">
              <MdVerifiedUser></MdVerifiedUser>
              <h1>Thanks for purchasing </h1>
              <h4>Order : {newId}</h4>
            </div>
          ) : (
            <div>
              {myArray.length > 0 ? (
                <Table
                  className="table w-50 justify-content-center"
                  striped
                  bordered
                  hover
                  variant="secondary"
                >
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
                            <h6 className="title">{title}</h6>
                            <img
                              src={`data:image/jpeg;base64,${image}`}
                              alt={title}
                            />
                          </td>
                          <td>
                            {price}$ * {quantity}
                            <h4>
                              Sub-Total :
                              {Math.round(price * quantity * 100) / 100} $
                            </h4>
                          </td>
                          <td>
                            <FaPlusCircle
                              className="arrow"
                              onClick={() => increase(index)}
                            ></FaPlusCircle>
                            <h4 className="quantity">{quantity}</h4>
                            <FaMinusCircle
                              className="arrow"
                              onClick={() => decrease(index, id)}
                            ></FaMinusCircle>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                  <tbody>
                    <tr>
                      <td>
                        <p className="sum">Total</p>
                      </td>
                      <td></td>
                      <td>
                        <p className="sum">
                          {Math.round(getprice * 100) / 100}$
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td></td>
                      <td></td>
                      <button
                        className="proceed "
                        onClick={() => isShowing(!show)}
                      >
                        Proceed
                      </button>
                    </tr>
                  </tbody>
                </Table>
              ) : (
                <div>
                  {empty && (
                    <div className="empty-purchase">
                      <h1>Your Cart Is empty!</h1>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </article>
    </>
  );
}

export default Cart;
