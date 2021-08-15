import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import "../styling/category.css";
import NavbarCom from "./NavbarCom";
import Robot from "./Robot";
function Categories() {
  const [movieInfo, setMovieInfo] = useState([]);
  const allCategories = [
    "All",
    ...new Set(movieInfo.map((Categories) => Categories.description)),
  ];
  const [menuItems, setmenuItems] = useState([]);

  const fetchUserProfile = () => {
    axios.get("http://localhost:8080/api/movie").then((res) => {
      setMovieInfo(res.data);
      setmenuItems(res.data);
    });
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const filterCategory = (description) => {
    if (description === "All" || description === "all") {
      setmenuItems(movieInfo);
      return;
    }
    let newitems = movieInfo.filter((item) => item.description === description);
    setmenuItems(newitems);
  };
  return (
    <>
      <NavbarCom></NavbarCom>
      <Sidebar />
      <Robot></Robot>
      <Container className="category_container">
        <Row>
          <Col>
            <h2 className="category-col">Categories</h2>
          </Col>
        </Row>
        <Row>
          <Col className="description-col">
            {allCategories.map((category, index) => {
              return (
                <Button
                  key={index}
                  onClick={() => filterCategory(category)}
                  variant="outline-danger"
                  className="category-btn"
                  type="button"
                >
                  {category}
                </Button>
              );
            })}
          </Col>
        </Row>
      </Container>
      <Container className="w-100">
        <Row>
          {menuItems.map((movie) => {
            const { id, title, price, image } = movie;
            return (
              <article key={id} className="movies-info">
                <h3 className="title">{title}</h3>
                <div className="img-container">
                  <img src={`data:image/jpeg;base64,${image}`} alt={title} />
                </div>
                <h5 className="price">{price}$</h5>
              </article>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default Categories;
