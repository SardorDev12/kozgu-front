import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../services/authService"; // Assuming you have an authService file
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:8000/api/";

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To handle error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the login request
      const response = await axios.post(`${API}login/`, {
        username,
        password,
      });

      // Call the login function from the context to store the user info or token
      login(response.data);

      // Redirect to home page or a protected route
      navigate("/");
    } catch (error) {
      // If there's an error, set the error message in the state
      setError("Login failed. Please check your credentials.");
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error if exists */}
    </div>
  );
};

export default Login;
