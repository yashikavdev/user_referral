import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import DashBoard from "../components/Dashboard";
import UserInvitation from "../components/UserInvitation";
import PrivateRoute from "./privateRoute";

function Index() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route
          path="/dashboard"
          element={<PrivateRoute component={DashBoard} />}
        />
        <Route
          path="/new-invitation"
          element={<PrivateRoute component={UserInvitation} />}
        />
      </Routes>
    </Router>
  );
}

export default Index;
