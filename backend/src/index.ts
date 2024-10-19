import express from "express";
import sequelize from "./config/database";
import bodyParser from "body-parser";
import userRoutes from "./routes/router";
import cors from "cors";
import path from "path";
import { Socket } from "socket.io"; 

const app = express();
const port = process.env.PORT 
const checkconnection = async () => {
  try {
    try {
      await sequelize.authenticate();
      console.log("Database connection successful!");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }

    await sequelize.sync({ alter: true });
    console.log(" Models synchronized successfully.");
    app.listen(port, () =>{
      console.log(`Server is listening on the port: ${port}`);
    })
    // app.listen(5000, () => {
    //   console.log("server started");
    // });
  } catch (error) {
    console.log(error, "errrrrr");
  }
};
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
checkconnection();
app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(bodyParser.json());
app.use("/users", userRoutes);

