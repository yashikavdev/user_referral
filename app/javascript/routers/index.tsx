import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import DashBoard from "../components/Dashboard";
import PrivateRoute from "./privateRoute";
import UserInvitation from "../components/UserInvitation";

function Index() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
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
