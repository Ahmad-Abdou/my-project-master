import React, { useContext, useState, useEffect } from "react";
import "../styling/cart.css";
import { AppContext } from "../context/CartContext";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import Sidebar from "./Sidebar";
import NavbarCom from "./NavbarCom";
import axios from "axios";

function Cart() {
  const { myArray, setMyArray } = useContext(AppContext);
  const [show, isShowing] = useState(false);
  // eslint-disable-next-line
  const [empty, isEmpty] = useState(true);
  const [mySignedInUser, setMySignedInUser] = useState("");
  const [mySignedInAlert, setMySignedInAlert] = useState(true);
  const [resultArray, setResultArray] = useState({
    title: "",
    price: "",
    description: "",
    quantity: "",
  });
  const [myOrderNumber, setMyOrderNumber] = useState([]);

  // console.log(myOrderNumber);
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

  const signedInUser = () => {
    axios
      .get(`http://localhost:8080/api/v1/signin`)
      .then((res) => {
        setMySignedInUser(res.data);
        setMySignedInAlert(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const buyItems = () => {
    axios
      .post(`http://localhost:8080/api/v1/buy`, resultArray)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/order/ordernumber`)
      .then((res) => {
        setMyOrderNumber(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    myArray.map((movie) => {
      return setResultArray({
        title: movie.title,
        price: movie.price,
        description: movie.description,
        quantity: movie.quantity,
      });
    });
    signedInUser();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <NavbarCom setMySignedInUser={setMySignedInUser}></NavbarCom>
      <Sidebar />
      <article>
        <div>
          {show ? (
            <div className="empty-purchase">
              <MdVerifiedUser></MdVerifiedUser>
              <h1>Thanks for purchasing </h1>
              <h4>Order : {myOrderNumber.pop()}</h4>
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
                      <td>
                        {mySignedInUser === "" ? (
                          <button
                            className="proceed "
                            onClick={() => {
                              alert("you need to sign in to proceed");
                            }}
                          >
                            Proceed
                          </button>
                        ) : (
                          <button
                            className="proceed "
                            onClick={() => {
                              buyItems();
                              isShowing(true);
                            }}
                          >
                            Proceed
                          </button>
                        )}
                      </td>
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
