import express from 'express';
import sequelize from './config/database';
import authRoutes from './routes/userRoute';
import cors from 'cors';

// App 
const app = express();
const PORT = 3001;

// cors
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/', authRoutes);

// Sync Database
sequelize.sync().then(() => {
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

