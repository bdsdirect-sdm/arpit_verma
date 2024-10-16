import express from "express";
import { Router } from "express";
import {getUsers,createUsers,login}from "../controllers/SwaggerController";

const userRoute = Router()

userRoute.post('./',createUsers);
userRoute.get('./',getUsers);
userRoute.post('./login',login);

export default userRoute;