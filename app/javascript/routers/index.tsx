import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Dashboard";
import PrivateRoute from "./privateRoute";

function Index() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute component={Home} />}
        />
      </Routes>
    </Router>
  );
}

export default Index;
