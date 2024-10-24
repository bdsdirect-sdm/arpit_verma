import express from "express";
import sequelize from "./config/database";
import Messages from "./models/messageModel";
import User from "./models/user";
import bodyParser from "body-parser";
import userRoutes from "./routes/router";
import cors from "cors";
import path from "path";
import { setSocket } from "./socket";
import { httpServer } from "./socket";
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

    await User.sync({ alter: true });
    console.log(" User Model sync successfully.");
    await Messages.sync({alter: true});
    console.log("Messages Model sync successfully");
     app.listen(port, () =>{
      console.log(`Server is listening on the port: ${port}`);
    })
    
  } catch (error) {
    console.log(error, "errrrrr");
  }

  setSocket(httpServer);
  console.log("The Socket is on the port 4400");
    
    
};
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
checkconnection();
app.use(cors({
  origin: '*',
}));
app.use(bodyParser.json());
app.use("/users", userRoutes);

