import { Form, Field, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Login(){
    const navigate = useNavigate();

    const handlelogin = async(values:any) => {
        try{

            console.log(values);
            const response = await axios.post("http://localhost:3001/login", values)
                localStorage.setItem("token", response.data.token)
                const token = localStorage.getItem("token")
                console.log("Token:::::::", token); 
                navigate("/profile"); 
        }
        catch(err){
            alert("Error")
        }
    }
    return(<>
        <div>
            <h1>Login</h1>
            <Formik
                initialValues={{
                    email:'',
                    password:''
                }}
                onSubmit={handlelogin}
            >
                <Form>
                    <label htmlFor="email">email</label>
                    <Field type="email" name="email" placeholder=" Email" /><br/>
    
                    <label htmlFor="password">Password</label>
                    <Field type="password" name="password" placeholder=" Enter your password" /><br/>
    
                    <button type="submit">Submit</button>
                </Form>
        
            </Formik>
        </div>
        </>
            
        )
}