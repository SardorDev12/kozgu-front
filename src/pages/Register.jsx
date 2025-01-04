import React, { useState } from "react";
import authService from "../services/authService";
import pageImg from "../assets/images/login-img.png";
import "../assets/styles/components/login-register.scss";
import { NavLink, useLocation } from "react-router-dom";

const API = "http://127.0.0.1:8000/api/";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(username, email, password);
      alert("Registration successful");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="login-page">
      <div className="page-img">
        <img src={pageImg} alt="" />
      </div>
      <form className="login-register-form" onSubmit={handleSubmit}>
        <div className="form-title">
          <h1 className="title">KO'ZGU.UZ</h1>
          <p className="subtitle">Ro'yxatdan o'tish</p>
        </div>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        /> */}
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="submit-btn" type="submit">
          Register
        </button>
        <NavLink
          className="login-register-cta"
          to="/login/"
          state={{ from: location.pathname }}
        >
          Kirish
        </NavLink>
      </form>
    </div>
  );
};

export default Register;
