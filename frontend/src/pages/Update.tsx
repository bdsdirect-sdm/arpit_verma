import { Form, Field, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Update() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const handleupdate = async (values: any) => {
        console.log(values);
        await axios.post("http://localhost:3001/profile/update", 
            values,
            {
                headers: {
                    "Authorization" : `Bearer ${token}`
                }
            }
        )
        .then(() => {
            navigate("/update"); 
        })
        .catch((e) => {
            console.log("Error:", e);
        });
    }
    
    return (
        <>
            <div>
                <h1>Update Profile</h1>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        dob: '', // Initialize DOB
                        gender: '', // Initialize gender
                        phoneNumber: '' // Initialize phone number
                    }}
                    onSubmit={handleupdate}
                >
                    <Form>
                        <label htmlFor="firstName">First Name</label>
                        <Field id="firstName" name="firstName" placeholder="Enter Your First Name" /><br/>

                        <label htmlFor="lastName">Last Name</label>
                        <Field id="lastName" name="lastName" placeholder="Enter Your Last Name" /><br/>

                        <label htmlFor="email">Email</label>
                        <Field type="email" name="email" placeholder="Enter Your Email" /><br/>

                        <label htmlFor="dob">Date of Birth</label>
                        <Field id="dob" name="dob" type="date" placeholder="Select Your Date of Birth" /><br/>

                        <label htmlFor="gender">Gender</label>
                        <Field as="select" id="gender" name="gender">
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </Field><br/>

                        <label htmlFor="phoneNumber">Phone Number</label>
                        <Field id="phoneNumber" name="phoneNumber" placeholder="Enter Your Phone Number" /><br/>

                        <button type="submit">Update Profile</button>
                    </Form>
                </Formik>
            </div>
        </>
    );
}































// import React from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// interface ProfileFormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   dob: string;
//   gender: string;
//   phoneNumber: string;
// }

// const ProfileUpdateForm: React.FC = () => {
//   const initialValues: ProfileFormData = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     dob: '',
//     gender: '',
//     phoneNumber: ''
//   };

//   const validationSchema = Yup.object().shape({
//     firstName: Yup.string().required('First name is required'),
//     lastName: Yup.string().required('Last name is required'),
//     email: Yup.string().email('Invalid email format').required('Email is required'),
//     dob: Yup.date().required('Date of birth is required'),
//     gender: Yup.string().required('Gender is required'),
//     phoneNumber: Yup.string().required('Phone number is required')
//   });

//   const handleSubmit = async (values: ProfileFormData) => {
//     // Simulate an API call to check if the email exists
//     const emailExists = await checkEmailUniqueness(values.email);
    
//     if (emailExists) {
//       alert("Email already exists");
//       return;
//     }

//     console.log('Form submitted:', values);
//     // Add your submission logic here (e.g., API call)
//   };

//   const checkEmailUniqueness = async (email: string): Promise<boolean> => {
//     // Simulate an API call to check if the email exists
//     // Replace with actual API logic
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(false); // Change this based on your logic
//       }, 1000);
//     });
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//     >
//       {({ errors, touched }) => (
//         <Form>
//           <div>
//             <label>First Name:</label>
//             <Field type="text" name="firstName" />
//             <ErrorMessage name="firstName" component="div" />
//           </div>
//           <div>
//             <label>Last Name:</label>
//             <Field type="text" name="lastName" />
//             <ErrorMessage name="lastName" component="div" />
//           </div>
//           <div>
//             <label>Email:</label>
//             <Field type="email" name="email" />
//             <ErrorMessage name="email" component="div" />
//           </div>
//           <div>
//             <label>Date of Birth:</label>
//             <Field type="date" name="dob" />
//             <ErrorMessage name="dob" component="div" />
//           </div>
//           <div>
//             <label>Gender:</label>
//             <div role="group">
//               <label>
//                 <Field type="radio" name="gender" value="male" />
//                 Male
//               </label>
//               <label>
//                 <Field type="radio" name="gender" value="female" />
//                 Female
//               </label>
//               <label>
//                 <Field type="radio" name="gender" value="other" />
//                 Other
//               </label>
//               <ErrorMessage name="gender" component="div" />
//             </div>
//           </div>
//           <div>
//             <label>Phone Number:</label>
//             <Field type="tel" name="phoneNumber" />
//             <ErrorMessage name="phoneNumber" component="div" />
//           </div>
//           <button type="submit">Submit</button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default ProfileUpdateForm;






















// export default function Profile(){
//     return(
//         <>
//         </>
//     )
// }