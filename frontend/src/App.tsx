import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Signup from "./components/Signupform";
import Login from "./components/Login";
import AgencyDetails from "./components/Agencydetails";
import JobSeekers from "./components/Jobseeker";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const isLoggedIn = !!localStorage.getItem("authToken");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/job-seekers"
          element={isLoggedIn ? <JobSeekers /> : <Navigate to="/job-SeekerStatusUpdate" />}
        />
        
        <Route
          path="/agency-details"
          element={isLoggedIn ? <AgencyDetails /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
