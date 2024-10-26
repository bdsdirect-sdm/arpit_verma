import express from "express";
import sequelize from "./config/database";
import cors from "cors";
import serverInitialize from "./models";
import userRoutes from "./routes/router"
import path from "path";


const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());

serverInitialize();

app.listen(PORT, ()=>{
    console.log(`Server is running on the port'; ${PORT}`);   
});

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/users", userRoutes);
