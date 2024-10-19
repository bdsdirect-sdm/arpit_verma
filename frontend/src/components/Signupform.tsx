import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";


const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  photopath: Yup.mixed()
    .required("Profile photo is required")
    .test("fileSize", "File too large", (value: any) => {
      return !value || value.size <= 5024 * 5024;
    })
    .test("fileType", "Only .png and .jpeg files are allowed", (value: any) => {
      return value && ["image/png", "image/jpeg"].includes(value.type);
    }),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  usertype: Yup.string().required("User type is required"),
  cvpath: Yup.mixed()
    .test(
      "required-if-jobseeker",
      "CV is required for Job Seekers",
      function (value: any) {
        const { usertype } = this.parent;
        return usertype === "jobseeker" ? !!value : true;
      }
    )
    .test("fileType", "Only .pdf and .docx files are allowed", (value: any) => {
      return (
        value == null ||
        [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(value.type)
      );
    }),
});

const Signup = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleSignup = async (formdata: any) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/users",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    const getAgency = async () => {
      try {
        const response: any = await axios.get(
          "http://localhost:4000/users/allagencies"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getAgency();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Signup</h2>
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          gender: "",
          usertype: "",
          agency: "",
          hobbies: [],
          photopath: "",
          cvpath: "",
          agencyid: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values: any) => {
          const formdata: any = new FormData();
          formdata.append("firstname", values.firstname);
          formdata.append("lastname", values.lastname);
          formdata.append("email", values.email);
          formdata.append("phone", values.phone);
          formdata.append("gender", values.gender);
          formdata.append("usertype", values.usertype);
          formdata.append("hobbies", values.hobbies);

          if (values.photopath) {
            formdata.append("photopath", values.photopath);
          }
          if (values.cvpath) {
            formdata.append("cvpath", values.cvpath);
          }
          if (values.usertype === "jobseeker") {
            formdata.append("agencyid", values.agency);
          }

          handleSignup(formdata);
          alert("User created, please check your email for a password");
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="row mb-3">
              <div className="col">
                <label className="form-label">First Name:</label>
                <Field className="form-control" name="firstname" />
              </div>
              <div className="col">
                <label className="form-label">Last Name:</label>
                <Field className="form-control" name="lastname" />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Email:</label>
              <Field className="form-control" name="email" />
            </div>

            <div className="mb-3">
              <label className="form-label">Profile Photo:</label>
              <input
                type="file"
                name="photopath"
                className="form-control"
                onChange={(event) => {
                  setFieldValue(
                    'photopath',
                    event.currentTarget.files ? event.currentTarget.files[0] : null
                  );
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone:</label>
              <Field className="form-control" name="phone" />
            </div>

            <div className="mb-3">
              <label className="form-label">Gender:</label>
              <div role="group" aria-labelledby="my-radio-group">
                <label>
                  <Field type="radio" name="gender" value="male" />
                  Male
                </label>
                <label>
                  <Field type="radio" name="gender" value="female" />
                  Female
                </label>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">User Type:</label>
              <Field as="select" name="usertype" className="form-select">
                <option value="" label="Select user type" />
                <option value="jobseeker">Job Seeker</option>
                <option value="agency">Agency</option>
              </Field>
            </div>

            {values.usertype === 'jobseeker' && (
              <>
                <div className="mb-3">
                  <label className="form-label">Agency:</label>
                  <Field as="select" name="agency" className="form-select">
                    <option value="">Select Agency</option>
                    {data.map((agency: any) => (
                      <option key={agency.id} value={agency.id}>
                        {agency.firstname}
                      </option>
                    ))}
                  </Field>
                </div>

                <div className="mb-3">
                  <label className="form-label">CV (PDF):</label>
                  <input
                    type="file"
                    name="cvpath"
                    className="form-control"
                    onChange={(event) => {
                      setFieldValue(
                        'cvpath',
                        event.currentTarget.files ? event.currentTarget.files[0] : null
                      );
                    }}
                  />
                </div>
              </>
            )}

            <div className="mb-3">
              <label className="form-label">Hobbies:</label>
              <div>
                <label>
                  <Field
                    type="checkbox"
                    name="hobbies"
                    value="Singing"
                    className="form-check-input"
                  />
                  Singing
                </label>
                <label>
                  <Field
                    type="checkbox"
                    name="hobbies"
                    value="Traveling"
                    className="form-check-input"
                  />
                  Traveling
                </label>
                <label>
                  <Field
                    type="checkbox"
                    name="hobbies"
                    value="Reading"
                    className="form-check-input"
                  />
                  Reading
                </label>
                <label>
                  <Field
                    type="checkbox"
                    name="hobbies"
                    value="Playing"
                    className="form-check-input"
                  />
                  Playing
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
