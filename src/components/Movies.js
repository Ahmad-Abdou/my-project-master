import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import axios from "axios";
import "../styling/movies.css";
import Sidebar from "./Sidebar";

function Movies() {
  const [movieData, setMovieData] = useState({
    title: "",
    price: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const { title, price, description, image } = movieData;
  const [isSubmited, setIsSubmited] = useState(false);

  const changeHandler = (e) => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };
  const uploadImage = (files) => {
    setSelectedFile(files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    axios
      .post(`http://localhost:8080/api/movie/upload`, formData, config)

      .then((res) => {
        setIsSubmited(true);
        setTimeout(() => {
          setIsSubmited(false);
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Sidebar />
      {isSubmited && (
        <Alert className="my-alert" variant="success">
          Movie Edited Successfully
        </Alert>
      )}

      <Form className="adding-movie" onSubmit={submitHandler}>
        <Row>
          <Col>
            <Form.Control
              className="field"
              type="text"
              placeholder="Movie Name "
              name="title"
              value={title}
              onChange={changeHandler}
            />
          </Col>
          <Col>
            <Form.Control
              className="field"
              type="text"
              placeholder="Price $"
              name="price"
              value={price}
              onChange={changeHandler}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control
              className="field"
              name="description"
              value={description}
              onChange={changeHandler}
              placeholder="description"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.File.Input
              className="field-file"
              name="image"
              type="text"
              onChange={(e) => uploadImage(e.target.files)}
              value={image}
            />
          </Col>
        </Row>
        <Row>
          <Button
            className="w-100 mt-3 border-warning"
            variant="success"
            type="submit"
          >
            <h3>Add</h3>
          </Button>
        </Row>
      </Form>
    </>
  );
}

export default Movies;
