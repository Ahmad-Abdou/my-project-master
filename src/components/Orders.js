import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Container, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import NavbarCom from "./NavbarCom";
function Orders() {
  const [movieOrder, setMovieOrder] = useState([]);

  const fetchOrders = () => {
    axios
      .get("http://localhost:8080/api/v1/buy/orders")
      .then((res) => {
        setMovieOrder(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <NavbarCom></NavbarCom>
      <Sidebar />
      <Container className="user_container">
        <Row>
          <Col>
            <h2 className="user-col">Orders</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            {movieOrder.map((myMovieOrder) => {
              const { id, order, movie } = myMovieOrder;
              const {
                myid,
                orderNumber,
                paymentAmount,
                paymentStatus,
                orderDate,
                user: { email },
              } = order;
              const { movieId, title, price, description, quantity } = movie;

              return (
                <div key={id}>
                  <Col>
                    <div key={myid}>
                      <h5 className="user_info">
                        Order Number : {orderNumber}
                      </h5>
                      <h5 className="user_info">
                        Payment amount: {paymentAmount}$
                      </h5>
                      <h5 className="user_info">
                        Payment status : {paymentStatus}
                      </h5>
                      <h5 className="user_info">Order date : {orderDate}</h5>
                      <h5 className="user_info">Email: {email}</h5>
                    </div>
                  </Col>
                  <Col>
                    <div key={movieId}>
                      <h5 className="user_info">Movie Name : {title}</h5>
                      <h5 className="user_info">Price : {price}$</h5>
                      <h5 className="user_info">Description : {description}</h5>
                      <h5 className="user_info">Quantity : {quantity}</h5>
                    </div>
                  </Col>
                </div>
              );
            })}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Orders;
