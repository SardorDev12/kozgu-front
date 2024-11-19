import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const DataContext = createContext();

const API = "http://127.0.0.1:8000/api/";

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({});

  const fetchData = async (endpoint) => {
    try {
      const response = await axios.get(`${API}${endpoint}/`);
      setData((prevData) => ({
        ...prevData,
        [endpoint]: response.data,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DataContext.Provider value={{ data, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
