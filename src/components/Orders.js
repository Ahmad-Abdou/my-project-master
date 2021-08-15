import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import Sidebar from "./Sidebar";
import NavbarCom from "./NavbarCom";
import "../styling/Orders.css";
function Orders() {
  const [movieOrder, setMovieOrder] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/buy/orders")
      .then((res) => {
        setMovieOrder(res.data);
        // console.log(...res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Sidebar />
      <NavbarCom></NavbarCom>
      <Table className="dashboard-table-orders" striped bordered hover>
        <thead>
          <tr>
            <th className="table-heading">Order Number</th>
            {/* <th className="table-heading">Email</th> */}
            <th className="table-heading">Movie name</th>
            <th className="table-heading">Price</th>
            <th className="table-heading">Quntity</th>
            <th className="table-heading">Payment amount</th>
            <th className="table-heading">Payment status</th>
            <th className="table-heading">Order date</th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-row">
            <td>
              {movieOrder.map((myMovieOrder) => {
                const { id, order } = myMovieOrder;
                const { orderNumber } = order;
                return (
                  <div key={id}>
                    <p className="table-order-number">{orderNumber}</p>
                  </div>
                );
              })}
            </td>
            <td>
              {movieOrder.map((myMovieOrder) => {
                const { id, order } = myMovieOrder;
                const {
                  user: { email },
                } = order;
                return (
                  <div key={id}>
                    <h5 className="table-body">{email}</h5>
                  </div>
                );
              })}
            </td>
            <td>
              {movieOrder.map((myMovieOrder) => {
                const { id, movie } = myMovieOrder;
                const { title } = movie;
                return (
                  <div key={id}>
                    {" "}
                    <h5 className="table-movie-name"> {title}</h5>
                  </div>
                );
              })}
            </td>
            <td>
              {movieOrder.map((myMovieOrder) => {
                const { id, movie } = myMovieOrder;
                const { price } = movie;
                return (
                  <div key={id}>
                    <h5 className="table-body"> {price}$</h5>
                  </div>
                );
              })}
            </td>
            <td>
              {movieOrder.map((myMovieOrder) => {
                const { id, movie } = myMovieOrder;

                const { quantity } = movie;
                return (
                  <div key={id}>
                    <h5 className="table-body"> {quantity}</h5>
                  </div>
                );
              })}
            </td>
            <td>
              {movieOrder.map((myMovieOrder) => {
                const { id, order } = myMovieOrder;
                const { paymentAmount } = order;
                return (
                  <div key={id}>
                    <h5 className="table-body">{paymentAmount}$</h5>
                  </div>
                );
              })}
            </td>

            <td>
              {movieOrder.map((myMovieOrder) => {
                const { id, order } = myMovieOrder;
                const { paymentStatus } = order;

                return (
                  <div key={id}>
                    <h5 className="payment-status">{paymentStatus}</h5>
                  </div>
                );
              })}
            </td>
            <td className="table-heading-date">
              {movieOrder.map((myMovieOrder) => {
                const { id, order } = myMovieOrder;
                const { orderDate } = order;

                return (
                  <div key={id}>
                    <p className="table-heading-date"> {orderDate}</p>
                  </div>
                );
              })}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default Orders;
