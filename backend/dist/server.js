"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const cors_1 = __importDefault(require("cors"));
// App 
const app = (0, express_1.default)();
const PORT = 3001;
// cors
app.use((0, cors_1.default)());
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/', userRoute_1.default);
// Sync Database
database_1.default.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
}).catch(err => console.error("Unable to connect to the database:", err));
// import express, {Express, Request, Response}from "express";
// import serverInitilize from "./models";
// const app : Express = express();
// const port = 4000;
// app.listen(port,()=>{
//     console.log(`server is running on port : ${port}`);
// });
// serverInitilize().then((res: any) => {
//     console.log('res ',res);
// }).catch((err: any) => {
//     console.log('err ',err);
// });
