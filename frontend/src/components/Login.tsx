import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters long"),
});

const Login = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (values: any) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/users/login",
        values
      );
      const token = response.data.token;
      const userType = response.data.user.usertype;
      localStorage.setItem("authToken", token);

      if (userType === "agency") {
        navigate("/agency-details");
      } else {
        navigate("/job-seekers");
      }

      setLoginError(null);
    } catch (error: any) {
      console.error("Login failed:", error);
      if (error.response && error.response.data) {
        setLoginError(error.response.data.message || "Login failed"); // Set error message
      } else {
        setLoginError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {loginError && (
        <div className="alert alert-danger">{loginError}</div>
      )}{" "}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleLogin(values)}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className={`form-control ${
                  errors.email && touched.email ? "is-invalid" : ""
                }`}
              />
              {errors.email && touched.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className={`form-control ${
                  errors.password && touched.password ? "is-invalid" : ""
                }`}
              />
              {errors.password && touched.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
