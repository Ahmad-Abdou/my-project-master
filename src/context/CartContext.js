import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [addingItem, setAddingItem] = useState([]);
  // eslint-disable-next-line
  const [counter, setCounter] = useState([]);
  const [myArray, setMyArray] = useState([]);
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    isLoading(true);
    axios.get("http://localhost:8080/api/movie").then((res) => {
      setData(res.data);
    });
    isLoading(false);
  }, []);
  if (loading) {
    return (
      <AiOutlineLoading3Quarters className="loading-icon"></AiOutlineLoading3Quarters>
    );
  }

  const add = (id) => {
    const newItem = data.find((item) => item.id === id);
    setCounter((newItem.quantity += 1));
    setAddingItem([...addingItem, newItem]);
    setMyArray([...new Set([...addingItem, newItem])]);
  };

  return (
    <AppContext.Provider value={{ add, myArray, setMyArray }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
