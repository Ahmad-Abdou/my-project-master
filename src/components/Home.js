import React, { useState, useContext, useEffect } from "react";
import "../styling/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppContext } from "../context/CartContext";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Sidebar from "./Sidebar";
function Home() {
  const { add, addingItem } = useContext(AppContext);
  const [input, setInput] = useState("");
  const [counter, setCounter] = useState(0);
  const [wishCounter, setWishCounter] = useState(0);
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(true);

  const fetchUserProfile = () => {
    isLoading(true);
    axios.get("http://localhost:8080/api/movie").then((res) => {
      setData(res.data);
      isLoading(false);
    });
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <AiOutlineLoading3Quarters className="loading-icon"></AiOutlineLoading3Quarters>
    );
  }
  return (
    <div>
      <Sidebar
        setInput={setInput}
        counter={counter}
        wishCounter={wishCounter}
      />

      <div className="container">
        {data
          .filter((item) => {
            if (input === "") {
              return item;
            } else if (item.title.toLowerCase().includes(input.toLowerCase())) {
              return item;
            }
          })
          .map((movie) => {
            const { id, title, price, image } = movie;

            return (
              <article key={id} className="movies-info">
                <h3 className="title">{title}</h3>
                <div className="img-container">
                  <img src={`data:image/jpeg;base64,${image}`} alt={title} />
                </div>
                <h5 className="price">{price}$</h5>

                <button
                  className="buy-btn"
                  onClick={() => {
                    setCounter(counter + 1);
                    add(id);
                  }}
                >
                  Buy
                </button>
                <button
                  className="wish-btn"
                  onClick={() => setWishCounter(wishCounter + 1)}
                >
                  Add to wish list
                </button>
              </article>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
