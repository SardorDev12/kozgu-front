import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalLayout from "./layouts/GlobalLayout"; // Path to your layout
import Login from "./pages/Login";
import Register from "./pages/Register";
import Article from "./pages/Article";
import ProtectedRoute from "./pages/ProtectedRoute";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<GlobalLayout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/articles/:id" element={<Article />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
