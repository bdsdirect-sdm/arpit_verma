import dbconnect from "../src/models/index";
import express from "express";
import userRoute from "./routes/SwaggerRoutes";
import apiDoc from "./swagger-docs";
import { createUsers, getUsers, login} from "./controllers/SwaggerController"
import { local } from "../src/config/dotenv.config"

const app = express();
const port = 4400;
dbconnect();

app.use('./users', userRoute);

apiDoc(app);


app.get('/' ,(req,res) =>{
    res.send('Welcome!')
});

app.listen(port, ()=>{
    console.log(`Server is listening on the port: ${port}`);
})

export default app;