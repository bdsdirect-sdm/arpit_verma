import { Field, Form, Formik, ErrorMessage } from "formik";
import React from "react";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";



interface ProductListValues {
    id: number;
    name:string;
    image:File | null;
    quantity:number;
    price:number;
    status:"Draft" | "Published";
    action:"Edit" | "delete" | "view";
    
}