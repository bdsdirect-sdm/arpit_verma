import { Field, Form, Formik, ErrorMessage } from "formik";
import React from "react";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

// Define the types for form values
interface AddProductValues {
  user_id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  status: "Draft" | "Published";
  image: File | null; 
}

// Validation schema for the add product form
const validationSchema = Yup.object().shape({
  user_id: Yup.number().required("User ID is required"),
  name: Yup.string().required("Product name is required"),
  category: Yup.string().required("Category is required"),
  quantity: Yup.number().min(1, "Quantity must be at least 1").required("Quantity is required"),
  price: Yup.number().min(0, "Price must be a positive number").required("Price is required"),
  status: Yup.string().oneOf(["Draft", "Published"], "Status must be Draft or Published").required("Status is required"),
  image: Yup.mixed().required("Image is required"),
});

const AddProduct: React.FC = () => {
  const navigate = useNavigate();

  const handleAddProduct = async (values: AddProductValues) => {
    const formData = new FormData();
    formData.append("user_id", values.user_id.toString());
    formData.append("name", values.name);
    formData.append("category", values.category);
    formData.append("quantity", values.quantity.toString());
    formData.append("price", values.price.toString());
    formData.append("status", values.status);
    if (values.image) {
      formData.append("image", values.image);
    }
    console.log("FORMM>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", formData);
    try {
      const response = await axios.post("http://localhost:4000/users/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    //   alert("Product added successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding product:", error);
   
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="text-center text-primary">Add Product</h2>
              <Formik
                initialValues={{
                  user_id: 0, 
                  name: "",
                  category: "",
                  quantity: 1,
                  price: 0,
                  status: "Draft",
                  image: null,
                }}
                validationSchema={validationSchema}
                onSubmit={handleAddProduct}
              >
                {({ setFieldValue }) => (
                  <Form>
                    <div className="mb-3">
                      <label className="form-label">User ID:</label>
                      <Field type="number" className="form-control" name="user_id" />
                      <ErrorMessage name="user_id" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Product Name:</label>
                      <Field className="form-control" name="name" />
                      <ErrorMessage name="name" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Category:</label>
                      <Field className="form-control" name="category" />
                      <ErrorMessage name="category" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Quantity:</label>
                      <Field type="number" className="form-control" name="quantity" />
                      <ErrorMessage name="quantity" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Price:</label>
                      <Field type="number" className="form-control" name="price" />
                      <ErrorMessage name="price" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Status:</label>
                      <Field as="select" className="form-control" name="status">
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                      </Field>
                      <ErrorMessage name="status" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Image:</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={(event) => {
                          if (event.currentTarget.files) {
                            setFieldValue("image", event.currentTarget.files[0]);
                          }
                        }}
                      />
                      <ErrorMessage name="image" component="div" className="text-danger" />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                      Add Product
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
