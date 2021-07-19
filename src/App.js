import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Dashboard from "./components/Dashboard";
import Movies from "./components/Movies";
import Users from "./components/Users";
import Categories from "./components/Categories";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/contact">
            <Contact></Contact>
          </Route>
          <Route path="/cart">
            <Cart></Cart>
          </Route>
          <Route path="/dashboard">
            <Dashboard></Dashboard>
          </Route>
          <Route path="/movies">
            <Movies></Movies>
          </Route>
          <Route path="/users">
            <Users></Users>
          </Route>
          <Route path="/categories">
            <Categories></Categories>
          </Route>
        </Switch>
      </Router>
      <Footer></Footer>
    </div>
  );
}

export default App;
