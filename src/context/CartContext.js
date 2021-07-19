import React, { useState, useEffect } from "react";
import axios from "axios";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [addingItem, setAddingItem] = useState([]);
  const [counter, setCounter] = useState([]);
  const [myArray, setMyArray] = useState([]);
  const [data, setData] = useState([]);

  const fetchUserProfile = () => {
    axios.get("http://localhost:8080/api/movie").then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

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
