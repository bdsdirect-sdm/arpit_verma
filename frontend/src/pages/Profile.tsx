import { Form, Field, Formik } from 'formik';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Profile: React.FC = ()=>{
    const token = localStorage.getItem(`token`);
    const [profile, setProfile] = useState({})
    
    useEffect(()=>{
        async function fetchprofile(){
            try{
                const response = await axios.get("http://localhost:3001/getuser",{
                    headers: {"Authorization": `Bearer ${token}`}
                })
                setProfile(response.data)   
            }catch{
                alert("Error hai bhai.....");
            }
        }
    },[])
    
    return (
        <>
        <h1>Hello</h1>
        </>
    )
}

export default Profile;