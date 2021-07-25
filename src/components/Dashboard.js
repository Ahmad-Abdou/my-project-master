import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Col,
  Container,
  Row,
  Table,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "../styling/dashboard.css";
import Sidebar from "./Sidebar";
import {
  BiMovie,
  BiUser,
  BiListUl,
  BiCart,
  BiTrash,
  BiPencil,
} from "react-icons/bi";
function Dashboard() {
  const [movieInfo, setMovieInfo] = useState([]);
  const [userCounter, setUserCounter] = useState(0);
  const [moviesCounter, setMoviesCounter] = useState(0);
  const [categoriesCounter, setCategoriesCounter] = useState([]);
  const [movieData, setMovieData] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    image: "",
  });
  const { newtitle, newprice, newdescription } = movieData;
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [loading, isLoading] = useState(true);

  const changeHandler = (e) => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };

  const myCategories = [
    ...new Set(movieInfo.map((Categories) => Categories.description)),
  ];

  const fetchMovies = () => {
    isLoading(true);
    axios
      .get("http://localhost:8080/api/movie")
      .then((res) => {
        setMovieInfo(res.data);
        setMoviesCounter(res.data.length);
        isLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUserProfile = () => {
    axios.get("http://localhost:8080/api/v1").then((res) => {
      setUserCounter(res.data.length);
      setCategoriesCounter(myCategories.length);
    });
  };
  const DeleteMovie = (id) => {
    axios.delete(`http://localhost:8080/api/movie/${id}`).then((res) => {
      if (res.data != null) {
        setMovieInfo(movieInfo.filter((movie) => movie.id !== id));
        setIsDeleted(true);
        setTimeout(() => {
          setIsDeleted(false);
        }, 5000);
      }
    });
  };
  const EditMovie = (id) => {
    setIsEditing(!isEditing);
    let myMovie = movieInfo.find((movie) => movie.id === id);
    setMovieData(myMovie);
    axios
      .put(`http://localhost:8080/api/movie/edit/${id}`, movieData)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/api/movie/add`, movieData)
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

  useEffect(() => {
    fetchUserProfile();
    fetchMovies();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {};
  }, []);

  if (loading) {
    return (
      <AiOutlineLoading3Quarters className="loading-icon"></AiOutlineLoading3Quarters>
    );
  }
  return (
    <>
      <Sidebar />
      <Container className="dashboard-container">
        <Row className="item-row">
          <Col></Col>
          <Col className="item-col">
            <h3 className="item-style">
              <BiUser className="my-icons"></BiUser>
            </h3>
            <h3 className="square-info">{userCounter}</h3>
          </Col>
          <Col className="item-col">
            <h3 className="item-style">
              <BiMovie className="my-icons"></BiMovie>
            </h3>
            <h3 className="square-info">{moviesCounter}</h3>
          </Col>
        </Row>
        <Row className="item-row">
          <Col></Col>
          <Col className="item-col">
            <h3 className="item-style">
              <BiCart className="my-icons"></BiCart>
            </h3>
            {/* <h3>5</h3> */}
          </Col>
          <Col className="item-col">
            <h3 className="item-style">
              <BiListUl className="my-icons"></BiListUl>
            </h3>
            <h3 className="square-info">{categoriesCounter}</h3>
          </Col>
        </Row>
      </Container>
      {isSubmited && (
        <Alert className="my-alert" variant="info">
          Movie Edited Successfully
        </Alert>
      )}
      {isDeleted && (
        <Alert className="my-alert" variant="danger">
          Movie has been Deleted
        </Alert>
      )}
      <Container>
        <Table className="dashboard-table" striped bordered hover>
          <thead>
            <tr>
              <th className="table-heading">ID</th>
              <th className="table-heading">Image</th>
              <th className="table-heading">Title</th>
              <th className="table-heading">Price</th>
              <th className="table-heading">Category</th>
              <th></th>
            </tr>
          </thead>
          {movieInfo.map((movie) => {
            const { id, title, price, image, description } = movie;
            return (
              <tbody key={id}>
                <tr>
                  <td>{id}</td>
                  <td>
                    <img src={`data:image/jpeg;base64,${image}`} alt={title} />
                  </td>
                  <td>{title}</td>
                  <td>{price}</td>
                  <td>{description}</td>
                  <td>
                    <BiTrash
                      onClick={() => DeleteMovie(id)}
                      className="trash-icon"
                    ></BiTrash>
                    <BiPencil
                      onClick={() => EditMovie(id)}
                      className="edit-icon"
                    ></BiPencil>
                  </td>
                </tr>
                <tr>
                  <td>
                    {isEditing && (
                      <Form
                        className="adding-movie-container"
                        onSubmit={submitHandler}
                      >
                        <Row>
                          <Col>
                            <Form.Control
                              className="field"
                              type="text"
                              placeholder="id"
                              name="id"
                              value={id}
                              onChange={changeHandler}
                              disabled
                            />
                          </Col>
                          <Col>
                            <Form.Control
                              className="field"
                              type="text"
                              placeholder="Movie Name "
                              name="title"
                              value={newtitle}
                              onChange={changeHandler}
                            />
                          </Col>
                          <Col>
                            <Form.Control
                              className="field"
                              type="text"
                              placeholder="Price $"
                              name="price"
                              value={newprice}
                              onChange={changeHandler}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Control
                              className="field"
                              name="description"
                              value={newdescription}
                              onChange={changeHandler}
                              placeholder="description"
                            />
                          </Col>
                        </Row>
                        <Row>
                          {/* <Col>
                            <Form.File.Input
                              className="field"
                              name="image"
                              value={newimage}
                              onChange={changeHandler}
                              placeholder="image"
                            />
                          </Col> */}
                        </Row>
                        <Row>
                          <Button
                            className="w-100 mt-3 border-warning"
                            variant="success"
                            type="submit"
                          >
                            <h3>Add</h3>
                          </Button>
                          <Button
                            className="w-100 mt-3 border-warning"
                            variant="danger"
                            onClick={() => setIsEditing(false)}
                          >
                            <h3>Exit</h3>
                          </Button>
                        </Row>
                      </Form>
                    )}
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </Container>
    </>
  );
}

export default Dashboard;
