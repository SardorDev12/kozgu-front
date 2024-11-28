import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
const API = "http://127.0.0.1:8000/api/";

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    return localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authTokens) {
      axios
        .get(`${API}home/`, {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        });
    }
  }, [authTokens]);

  const login = (tokens) => {
    setAuthTokens(tokens);
    localStorage.setItem("authTokens", JSON.stringify(tokens));
  };

  const logout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authTokens }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
