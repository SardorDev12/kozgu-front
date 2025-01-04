import React, { useState } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import pageImg from "../assets/images/login-img.png";
import "../assets/styles/components/login-register.scss";
import { NavLink, useLocation } from "react-router-dom";

const API = "http://127.0.0.1:8000/api/";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.login(username, password);
      navigate("/");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="page-img">
        <img src={pageImg} alt="" />
      </div>
      <form className="login-register-form" onSubmit={handleSubmit}>
        <h1 className="form-title">KO'ZGU.UZ</h1>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="submit-btn" type="submit">
          Login
        </button>
        <NavLink
          className="login-register-cta"
          to="/register/"
          state={{ from: location.pathname }}
        >
          Ro'yxatdan o'tish
        </NavLink>
      </form>
    </div>
  );
};

export default Login;
