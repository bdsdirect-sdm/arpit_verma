import { Field, Form, Formik, ErrorMessage } from "formik";
import React from "react";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

// Define the types for form values
interface LoginValues {
  email: string;
  password: string;
}

// Validation schema for the login form
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async (values: LoginValues) => {
    try {
      const response = await axios.post("http://localhost:4000/users/login", values);
      alert("Login successful");
      navigate("/add-product");
    } catch (error) {
      console.log("Error logging in:", error);
      
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="text-center text-primary">Welcome Back!</h2>
              <p className="text-center">Please log in to continue.</p>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
              >
                {() => (
                  <Form>
                    <div className="mb-3">
                      <label className="form-label">Email:</label>
                      <Field className="form-control" name="email" />
                      <ErrorMessage name="email" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Password:</label>
                      <Field type="password" className="form-control" name="password" />
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                      Login
                    </button>
                  </Form>
                )}
              </Formik>
              {/* Uncomment if you want to enable forgot password link */}
              {/* <div className="mt-3 text-center">
                <a href="/forgot-password" className="text-decoration-none">Forgot your password?</a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
