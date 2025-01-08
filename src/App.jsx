import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalLayout from "./layouts/GlobalLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Article from "./pages/Article";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Write from "./pages/Write";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<GlobalLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/write" element={<Write />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/articles/:id" element={<Article />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
